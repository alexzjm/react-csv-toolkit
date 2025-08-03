import React from 'react'
import { useState } from 'react'

function InteractiveTable({ parsedCsv, updateParsedCsv, editMode, 
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

        const tempTable = parsedCsv.slice(1);
        tempTable.sort((a, b) => {
            if (revSort) {
                return a[colIdx] < b[colIdx] ? 1 : -1;
            } else {
                return a[colIdx] > b[colIdx] ? 1 : -1;
            }
        });
        const newTable = parsedCsv.slice(0, 1).concat(tempTable);
        updateParsedCsv(newTable);
    }

    const handleClick = (rowIdx, colIdx) => {
        if (editMode) {
            updateEditIdx(rowIdx, colIdx);
        }
    }

    const handleInputChange = (newValue, rowIdx, colIdx) => {
        const newTable = parsedCsv.map(subArr => [ ...subArr ]);
        newTable[rowIdx][colIdx] = newValue;
        updateParsedCsv(newTable);
    }

    return (
        <div className="overflow-x-auto shadow-sm border border-gray-200 rounded-lg">
            <table className="min-w-full text-sm">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        {parsedCsv[0].map((header, colIdx) => {
                            if (editMode) {
                                if (rowEditIdx == 0 && colEditIdx == colIdx) {
                                    return <th key={colIdx} className="px-6 py-4 text-left font-medium text-gray-700">
                                        <input 
                                            type="text" 
                                            value={header}
                                            onChange={(e) => handleInputChange(e.target.value, 0, colIdx)}
                                            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </th>
                                } else {
                                    return <th 
                                        key={colIdx} 
                                        onClick={() => handleClick(0, colIdx)} 
                                        className="px-6 py-4 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                                    >
                                        {header}
                                    </th>
                                }
                                
                            } else {
                                return <th 
                                    key={colIdx} 
                                    onClick={() => sortTable(colIdx)} 
                                    className="px-6 py-4 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                                >
                                    {header}
                                </th>
                            }
                        })}
                    </tr>
                </thead>

                <tbody className="bg-white">
                    {parsedCsv.map((subArr, rowIdx) => 
                        <tr key={rowIdx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                            {rowIdx != 0 && subArr.map((val, colIdx) => {
                                if (editMode && rowEditIdx == rowIdx && colEditIdx == colIdx) {
                                    return (
                                        <td key={colIdx} className="px-6 py-4 text-gray-900">
                                            <input 
                                                type="text" 
                                                value={val}
                                                onChange={(e) => handleInputChange(e.target.value, rowIdx, colIdx)}
                                                className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </td>
                                    )
                                } else {
                                    return (
                                        <td 
                                            key={colIdx} 
                                            onClick={() => handleClick(rowIdx, colIdx)} 
                                            className={`px-6 py-4 text-gray-900 ${editMode ? 'cursor-pointer' : ''}`}
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