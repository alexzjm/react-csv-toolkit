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
        <table>
            <tr>
                {parsedCsv[0].map((header, colIdx) => {
                    if (editMode) {
                        if (rowEditIdx == 0 && colEditIdx == colIdx) {
                            return <th key={colIdx}>
                                <form>
                                    <input type="text" onChange={(e) => handleInputChange(e.target.value, 0, colIdx)}></input>
                                </form>
                            </th>
                        } else {
                            return <th key={colIdx} onClick={() => handleClick(0, colIdx)}>{header}</th>
                        }
                        
                    } else {
                        return <th key={colIdx} onClick={() => sortTable(colIdx)}>{header}</th>
                    }
                })}
            </tr>
            {parsedCsv.map((subArr, rowIdx) => 
                <tr key={rowIdx}>
                    {rowIdx != 0 && subArr.map((val, colIdx) => {
                        if (editMode && rowEditIdx == rowIdx && colEditIdx == colIdx) {
                            return (
                                <td key={colIdx}>
                                    <form>
                                        <input type="text" onChange={(e) => handleInputChange(e.target.value, rowIdx, colIdx)}></input>
                                    </form>
                                </td>
                            )
                        } else {
                            return (<td key={colIdx} onClick={() => handleClick(rowIdx, colIdx)}>
                                {val}
                            </td>)
                        }
                    })}
                </tr>
            )}
        </table>
    );
}

export default InteractiveTable