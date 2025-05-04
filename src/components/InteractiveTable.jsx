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

    return (
        <table>
            <tr>
                {parsedCsv[0].map((header, colIdx) => 
                    <th key={colIdx} onClick={() => sortTable(colIdx)}>{header}</th>
                )}
            </tr>
            {parsedCsv.map((subArr, rowIdx) => 
                <tr key={rowIdx}>
                    {rowIdx != 0 && subArr.map((val, colIdx) => {
                        if (editMode && rowEditIdx == rowIdx && colEditIdx == colIdx) {
                            return (
                                <td key={colIdx}>To be edited</td>
                            )
                        } else {
                            return (<td key={colIdx} onClick={() => updateEditIdx(rowIdx, colIdx)}>
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