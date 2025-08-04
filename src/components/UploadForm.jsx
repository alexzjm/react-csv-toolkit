import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

const UploadForm = ({ onFileUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setFileName(file.name);
        onFileUpload([file]);
      } else {
        alert('Please upload a CSV file');
      }
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      setFileName(file.name);
      onFileUpload(files);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

    return (
    <div 
      className={`
        border border-dashed rounded-lg p-6 text-center transition-all duration-300
        ${isDragOver 
          ? 'border-blue-400 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
          : 'border-zinc-300 dark:border-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800'
        }
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
             <div className="space-y-3">
         <div className="text-4xl text-zinc-400 dark:text-zinc-500">
           <FontAwesomeIcon icon={faFolderOpen} />
         </div>
        
        <div>
          <h3 className="text-lg font-medium text-zinc-700 dark:text-zinc-200 mb-1">
            {fileName ? fileName : 'Upload CSV File'}
          </h3>
          
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {fileName 
              ? 'Click to change file'
              : 'Drag and drop or click to browse'
            }
          </p>
        </div>

        <button 
          type="button"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer font-medium text-sm transition-colors duration-300"
          onClick={handleClick}
        >
          {fileName ? 'Change File' : 'Choose File'}
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default UploadForm; 