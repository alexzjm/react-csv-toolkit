import React from 'react';

const Footer = () => {
  return (
    <footer className="max-w-4xl mx-auto px-4 py-6 mt-12 border-t border-zinc-200 dark:border-zinc-700">
      <div className="flex justify-between items-center text-sm text-zinc-500 dark:text-zinc-400">
        <div>
          Built with React and Tailwind CSS using Vite
        </div>
        <div>
          Author: Alex Zhang
        </div>
      </div>
    </footer>
  );
};

export default Footer; 