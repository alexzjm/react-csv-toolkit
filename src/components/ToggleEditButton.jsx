import React from 'react'

function ToggleEditButton({ editMode, updateEditModeStatus, updateEditIdx }) {

    const handleSubmit = () => {
        if (editMode) {
            updateEditIdx(-1, -1);
        }
        updateEditModeStatus(!editMode);
    }

    return (
        <button 
            onClick={handleSubmit} 
            className={`
                text-sm font-medium transition-colors duration-300 cursor-pointer px-3 py-1 rounded
                ${editMode 
                    ? 'text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30' 
                    : 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                }
            `}
        >
            {editMode ? "Save" : "Edit"}
        </button>
    );
}

export default ToggleEditButton