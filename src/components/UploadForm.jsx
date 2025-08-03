import React, { useState, useRef } from 'react';

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
        border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
        ${isDragOver 
          ? 'border-blue-400 bg-blue-50' 
          : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        }
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
        <div className="space-y-4">
          <div className="text-6xl text-gray-400 mb-4">
            📁
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-700">
              {fileName ? `Selected: ${fileName}` : 'Upload CSV File'}
            </h3>
            
            <p className="text-gray-500">
              {fileName 
                ? 'Click to change file or drag and drop a new CSV file here'
                : 'Drag and drop your CSV file here, or click to browse'
              }
            </p>
          </div>

          <div className="pt-4">
            <button 
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              onClick={handleClick}
            >
              {fileName ? 'Change File' : 'Choose File'}
            </button>
          </div>
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