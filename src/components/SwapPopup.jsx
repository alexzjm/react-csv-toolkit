import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

function SwapPopup({ isOpen, onClose, onSwap, maxRows, maxCols, parsedCsv }) {
  const [swapType, setSwapType] = useState("row"); // 'row' or 'column'
  const [index1, setIndex1] = useState("");
  const [index2, setIndex2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const idx1 = parseInt(index1);
    const idx2 = parseInt(index2);

    // Validate inputs
    if (isNaN(idx1) || isNaN(idx2)) {
      alert("Please enter valid numbers");
      return;
    }

    const maxIndex = swapType === "row" ? maxRows - 1 : maxCols - 1;

    if (idx1 < 0 || idx2 < 0 || idx1 > maxIndex || idx2 > maxIndex) {
      alert(`Please enter numbers between 0 and ${maxIndex}`);
      return;
    }

    if (idx1 === idx2) {
      alert("Please enter different indices");
      return;
    }

    onSwap(swapType, idx1, idx2);
    onClose();
  };

  const handleCancel = () => {
    setIndex1("");
    setIndex2("");
    setSwapType("row");
    onClose();
  };

  // Helper function to get preview content
  const getPreviewContent = (index) => {
    if (!parsedCsv || parsedCsv.length === 0) return null;

    if (swapType === "row") {
      if (index >= 0 && index < parsedCsv.length) {
        return parsedCsv[index];
      }
    } else {
      // For columns, get all values in that column
      if (index >= 0 && index < (parsedCsv[0]?.length || 0)) {
        return parsedCsv.map((row) => row[index]).slice(0, 5); // Show first 5 values
      }
    }
    return null;
  };

  // Helper function to format preview content
  const formatPreview = (content) => {
    if (!content) return "No data";

    if (Array.isArray(content)) {
      return content.map((item, idx) => (
        <span
          key={idx}
          className="inline-block bg-zinc-100 dark:bg-zinc-700 px-2 py-1 rounded text-xs mr-1 mb-1"
        >
          {String(item)}
        </span>
      ));
    }
    return String(content);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/95 dark:bg-zinc-800/95 backdrop-blur-md rounded-lg shadow-xl p-6 w-96 max-w-[90vw] border border-zinc-200/50 dark:border-zinc-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">
            Swap {swapType === "row" ? "Rows" : "Columns"}
          </h3>
          <button
            onClick={handleCancel}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Swap Type Selection */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Swap Type
            </label>
            <div className="flex gap-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="row"
                  checked={swapType === "row"}
                  onChange={(e) => setSwapType(e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  Rows
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="column"
                  checked={swapType === "column"}
                  onChange={(e) => setSwapType(e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  Columns
                </span>
              </label>
            </div>
          </div>

          {/* Index Inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                First {swapType === "row" ? "Row" : "Column"} Index
              </label>
              <input
                type="number"
                value={index1}
                onChange={(e) => setIndex1(e.target.value)}
                min="0"
                max={swapType === "row" ? maxRows - 1 : maxCols - 1}
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white"
                placeholder="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Second {swapType === "row" ? "Row" : "Column"} Index
              </label>
              <input
                type="number"
                value={index2}
                onChange={(e) => setIndex2(e.target.value)}
                min="0"
                max={swapType === "row" ? maxRows - 1 : maxCols - 1}
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white"
                placeholder="1"
                required
              />
            </div>
          </div>

          {/* Info Text */}
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Enter indices between 0 and{" "}
            {swapType === "row" ? maxRows - 1 : maxCols - 1}
          </p>

          {/* Warning for Row 0 */}
          {swapType === "row" && (index1 === "0" || index2 === "0") && (
            <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-md p-3">
              <p className="text-xs text-zinc-600 dark:text-zinc-300">
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className="mr-1"
                />{" "}
                <strong>Note:</strong> Row 0 is typically the header row.
                Swapping it may affect your data structure.
              </p>
            </div>
          )}

          {/* Preview Section */}
          {(index1 !== "" || index2 !== "") && (
            <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4">
              <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
                Preview
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {index1 !== "" && (
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                      {swapType === "row" ? "Row" : "Column"} {index1}:
                    </p>
                    <div className="bg-zinc-50 dark:bg-zinc-800 rounded p-2 min-h-[60px]">
                      {formatPreview(getPreviewContent(parseInt(index1)))}
                    </div>
                  </div>
                )}
                {index2 !== "" && (
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                      {swapType === "row" ? "Row" : "Column"} {index2}:
                    </p>
                    <div className="bg-zinc-50 dark:bg-zinc-800 rounded p-2 min-h-[60px]">
                      {formatPreview(getPreviewContent(parseInt(index2)))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-4 py-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-white border border-zinc-300 dark:border-zinc-600 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Swap
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SwapPopup;
