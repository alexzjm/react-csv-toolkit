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
                text-sm font-medium transition-colors cursor-pointer px-3 py-1 rounded
                ${editMode 
                    ? 'text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100' 
                    : 'text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100'
                }
            `}
        >
            {editMode ? "Save" : "Edit"}
        </button>
    );
}

export default ToggleEditButton