import React from 'react'
import { useState } from 'react'

function ToggleEditButton({ editMode, updateEditModeStatus }) {
    return (
        <button onClick={() => {updateEditModeStatus(!editMode)}}>
            {editMode ? "Save" : "Edit"}
        </button>
    );
}

export default ToggleEditButton