import React from 'react'

function ToggleEditButton({ editMode, updateEditModeStatus, updateEditIdx }) {

    const handleSubmit = () => {
        if (editMode) {
            updateEditIdx(-1, -1);
        }
        updateEditModeStatus(!editMode);
    }
    
    return (
        <button onClick={handleSubmit}>
            {editMode ? "Save" : "Edit"}
        </button>
    );
}

export default ToggleEditButton