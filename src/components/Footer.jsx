import React from 'react';

const Footer = () => {
  return (
    <footer className="max-w-4xl mx-auto px-4 py-6 mt-12 border-t border-zinc-200 dark:border-zinc-700">
      <div className="flex justify-between items-center text-sm text-zinc-500 dark:text-zinc-400">
        <div>
          <p>Built with React and Tailwind CSS using Vite</p>
          <a href="https://www.flaticon.com/free-icons/csv" title="csv icons">Csv icons created by Freepik - Flaticon</a>
        </div>
        <div>
          <a 
            href="https://github.com/alexzjm" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors duration-200"
          >
            By Alex Zhang
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 