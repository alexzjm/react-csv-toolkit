import React from 'react'

function ToggleEditButton({ editMode, updateEditModeStatus, updateEditIdx }) {

    const handleSubmit = () => {
        if (editMode) {
            updateEditIdx(-1, -1);
        }
        updateEditModeStatus(!editMode);
    }

    return (
        <button onClick={handleSubmit} className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded text-sm shadow-sm border border-blue-200">
            {editMode ? "Save" : "Edit"}
        </button>
    );
}

export default ToggleEditButton