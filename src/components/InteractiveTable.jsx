import React from 'react'
import { useState } from 'react'

function InteractiveTable({ parsedData, updateparsedData, editMode, updateEditModeStatus,
    rowEditIdx, colEditIdx, updateEditIdx }) {  

    const [sortByIdx, setSortByIdx] = useState(-1);
    const [reverseSort, setReverseSort] = useState(false);
    
    // helper function: sort the 2d table depending on the column and its type
    const sortTable = (colIdx) => {
        // set the state of sortByIdx and reverseSort
        let revSort = false; // to account for state updating on the next render
        if (sortByIdx != colIdx) {
            setSortByIdx(colIdx);
            setReverseSort(false);
        } else {
            setReverseSort(!reverseSort);
            revSort = !reverseSort;
        }

        const tempTable = parsedData.slice(1);
        tempTable.sort((a, b) => {
            if (revSort) {
                return a[colIdx] < b[colIdx] ? 1 : -1;
            } else {
                return a[colIdx] > b[colIdx] ? 1 : -1;
            }
        });
        const newTable = parsedData.slice(0, 1).concat(tempTable);
        updateparsedData(newTable);
    }

    const handleClick = (rowIdx, colIdx) => {
        if (editMode) {
            updateEditIdx(rowIdx, colIdx);
        }
    }

    const handleDoubleClick = (rowIdx, colIdx) => {
        // Enable edit mode and set the cell to edit
        updateEditIdx(rowIdx, colIdx);
        updateEditModeStatus(true);
    }

    const handleInputChange = (newValue, rowIdx, colIdx) => {
        const newTable = parsedData.map(subArr => [ ...subArr ]);
        newTable[rowIdx][colIdx] = newValue;
        updateparsedData(newTable);
    }

    const handleInputBlur = () => {
        // Exit edit mode when input loses focus
        updateEditIdx(-1, -1);
        updateEditModeStatus(false);
    }

    const handleInputKeyDown = (e, rowIdx, colIdx) => {
        if (e.key === 'Enter') {
            // Exit edit mode when Enter is pressed
            updateEditIdx(-1, -1);
            updateEditModeStatus(false);
        } else if (e.key === 'Escape') {
            // Cancel editing and restore original value
            updateEditIdx(-1, -1);
            updateEditModeStatus(false);
        }
    }

    // Helper function to check if a value is a number
    const isNumber = (value) => {
        return typeof value === 'number' || (!isNaN(value) && value !== '' && !isNaN(parseFloat(value)));
    }

    return (
        <div className="overflow-x-auto shadow-sm border border-zinc-200 dark:border-zinc-700 rounded-lg">
            <table className="min-w-full text-sm">
                <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
                        {parsedData[0].map((header, colIdx) => {
                            if (editMode) {
                                if (rowEditIdx == 0 && colEditIdx == colIdx) {
                                    return <th key={colIdx} className="px-6 py-4 text-left font-medium text-zinc-700 dark:text-zinc-200">
                                        <input 
                                            type="text" 
                                            value={header}
                                            onChange={(e) => handleInputChange(e.target.value, 0, colIdx)}
                                            onBlur={handleInputBlur}
                                            onKeyDown={(e) => handleInputKeyDown(e, 0, colIdx)}
                                            className="w-full px-3 py-1 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white"
                                            autoFocus
                                        />
                                    </th>
                                } else {
                                    return <th 
                                        key={colIdx} 
                                        onClick={() => handleClick(0, colIdx)} 
                                        onDoubleClick={() => handleDoubleClick(0, colIdx)}
                                        className="px-6 py-4 text-left font-medium text-zinc-700 dark:text-zinc-200 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors duration-300"
                                    >
                                        {header}
                                    </th>
                                }
                                
                            } else {
                                return <th 
                                    key={colIdx} 
                                    onClick={() => sortTable(colIdx)} 
                                    className="px-6 py-4 text-left font-medium text-zinc-700 dark:text-zinc-200 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors duration-300"
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{header}</span>
                                        {sortByIdx === colIdx && (
                                            <span className="ml-2 text-blue-600 dark:text-blue-400">
                                                {reverseSort ? '↓' : '↑'}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            }
                        })}
                    </tr>
                </thead>

                <tbody className="bg-white dark:bg-zinc-900">
                    {parsedData.map((subArr, rowIdx) => 
                        <tr key={rowIdx} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-300">
                            {rowIdx != 0 && subArr.map((val, colIdx) => {
                                if (editMode && rowEditIdx == rowIdx && colEditIdx == colIdx) {
                                    return (
                                        <td key={colIdx} className="px-6 py-4 text-zinc-900 dark:text-white">
                                            <input 
                                                type="text" 
                                                value={val}
                                                onChange={(e) => handleInputChange(e.target.value, rowIdx, colIdx)}
                                                onBlur={handleInputBlur}
                                                onKeyDown={(e) => handleInputKeyDown(e, rowIdx, colIdx)}
                                                className="w-full px-3 py-1 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white"
                                                autoFocus
                                            />
                                        </td>
                                    )
                                } else {
                                    return (
                                        <td 
                                            key={colIdx} 
                                            onClick={() => handleClick(rowIdx, colIdx)} 
                                            onDoubleClick={() => handleDoubleClick(rowIdx, colIdx)}
                                            className={`px-6 py-4 cursor-pointer ${
                                                isNumber(val) ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-zinc-900 dark:text-white'
                                            }`}
                                        >
                                            {val}
                                        </td>
                                    )
                                }
                            })}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default InteractiveTable