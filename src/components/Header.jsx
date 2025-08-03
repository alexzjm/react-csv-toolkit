import React from 'react';

const Header = () => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">CSV Editor</h1>
            <p className="text-gray-600 text-sm mt-1">
              Upload, view, and edit CSV files with ease
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">By Alex Zhang</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header; 