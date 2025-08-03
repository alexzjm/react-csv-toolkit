import React from 'react';

const Header = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">CSV Editor</h1>
      <p className="text-gray-600 mb-2">
        Upload a CSV file to view and edit it in a table format.
      </p>
      <p className="text-gray-600 mb-2">
        Click column headers to sort, use edit mode to modify cells, and download when finished.
      </p>
      <p className="text-sm text-gray-500 italic mb-4">
        By Alex Zhang
      </p>
    </div>
  );
};

export default Header; 