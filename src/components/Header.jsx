import React, { useState, useEffect } from 'react';

const Header = () => {

  return (
    <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">CSV Editor</h1>
            <p className="text-zinc-600 dark:text-zinc-300 text-sm mt-1">
              Upload, view, and edit CSV files with ease
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">By Alex Zhang</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header; 