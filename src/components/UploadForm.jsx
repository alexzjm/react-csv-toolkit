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
        border border-dashed rounded-lg p-6 text-center transition-all duration-200
        ${isDragOver 
          ? 'border-blue-400 bg-blue-50' 
          : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        }
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
             <div className="space-y-3">
         <div className="text-4xl text-gray-400">
           <FontAwesomeIcon icon={faFolderOpen} />
         </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-1">
            {fileName ? fileName : 'Upload CSV File'}
          </h3>
          
          <p className="text-sm text-gray-500">
            {fileName 
              ? 'Click to change file'
              : 'Drag and drop or click to browse'
            }
          </p>
        </div>

        <button 
          type="button"
          className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium text-sm transition-colors"
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