import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

function DownloadPopup({ isOpen, onClose, onDownload, originalFileName, originalFileType }) {
  const [filename, setFilename] = useState("");
  const [downloadType, setDownloadType] = useState("csv");

  // Set default values when popup opens
  useEffect(() => {
    if (isOpen) {
      setFilename(originalFileName || "untitled");
      setDownloadType(originalFileType || "csv");
    }
  }, [isOpen, originalFileName, originalFileType]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate filename
    if (!filename.trim()) {
      alert("Please enter a valid filename");
      return;
    }

    // Ensure filename has the correct extension
    let finalFilename = filename.trim();
    finalFilename += downloadType === "csv" ? ".csv" : ".tsv";

    onDownload(finalFilename, downloadType);
    onClose();
  };

  const handleCancel = () => {
    setFilename("");
    setDownloadType("csv");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/95 dark:bg-zinc-800/95 backdrop-blur-md rounded-lg shadow-xl p-6 w-96 max-w-[90vw] border border-zinc-200/50 dark:border-zinc-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">
            Download File
          </h3>
          <button
            onClick={handleCancel}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Filename Input */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Filename
            </label>
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white"
              placeholder="Enter filename"
              required
            />
          </div>

          {/* Download Type Selection */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Download Type
            </label>
            <select
              value={downloadType}
              onChange={(e) => setDownloadType(e.target.value)}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white"
            >
              <option value="csv">CSV (Comma-separated values)</option>
              <option value="tsv">TSV (Tab-separated values)</option>
            </select>
          </div>

          {/* Info Text */}
          <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-md p-3">
            <p className="text-xs text-zinc-600 dark:text-zinc-300">
              <FontAwesomeIcon icon={faDownload} className="mr-1" />
              <strong>Note:</strong> The file will be downloaded as {downloadType.toUpperCase()}. 
              If no extension is provided, it will be automatically added.
            </p>
          </div>

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
              Download
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DownloadPopup; 