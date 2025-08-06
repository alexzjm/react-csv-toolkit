import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

function DeletePopup({ isOpen, onClose, onDelete, maxRows, maxCols, parsedData, deleteType }) {
  const [index, setIndex] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const idx = parseInt(index);

    // Validate inputs
    if (isNaN(idx)) {
      alert("Please enter a valid number");
      return;
    }

    const maxIndex = deleteType === "row" ? maxRows - 1 : maxCols - 1;

    if (idx < 0 || idx > maxIndex) {
      alert(`Please enter a number between 0 and ${maxIndex}`);
      return;
    }

    onDelete(deleteType, idx);
    onClose();
  };

  const handleCancel = () => {
    setIndex("");
    onClose();
  };

  // Helper function to get preview content
  const getPreviewContent = (index) => {
    if (!parsedData || parsedData.length === 0) return null;

    if (deleteType === "row") {
      if (index >= 0 && index < parsedData.length) {
        return parsedData[index];
      }
    } else {
      // For columns, get all values in that column
      if (index >= 0 && index < (parsedData[0]?.length || 0)) {
        return parsedData.map((row) => row[index]).slice(0, 5); // Show first 5 values
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
            Delete {deleteType === "row" ? "Row" : "Column"}
          </h3>
          <button
            onClick={handleCancel}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Index Input */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              {deleteType === "row" ? "Row" : "Column"} Index to Delete
            </label>
                         <input
               type="number"
               value={index}
               onChange={(e) => setIndex(e.target.value)}
               min="0"
               max={deleteType === "row" ? maxRows - 1 : maxCols - 1}
               className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white"
               placeholder="0"
               required
             />
          </div>

          {/* Info Text */}
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Enter index between 0 and {deleteType === "row" ? maxRows - 1 : maxCols - 1}
          </p>

                     {/* Warning for Row 0 */}
           {deleteType === "row" && index === "0" && (
             <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-md p-3">
               <p className="text-xs text-zinc-600 dark:text-zinc-300">
                 <FontAwesomeIcon
                   icon={faTriangleExclamation}
                   className="mr-1"
                 />{" "}
                 <strong>Note:</strong> Row 0 is typically the header row.
                 Deleting it may affect your data structure.
               </p>
             </div>
           )}

                     {/* Preview Section */}
           {index !== "" && (
             <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4">
               <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
                 Preview
               </h4>
               <div className="bg-zinc-50 dark:bg-zinc-800 rounded p-2 min-h-[60px]">
                 {formatPreview(getPreviewContent(parseInt(index)))}
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
               Delete
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeletePopup; 