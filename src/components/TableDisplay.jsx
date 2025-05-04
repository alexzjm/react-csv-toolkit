import React from 'react'
import { useState } from 'react'

function TableDisplay({ parsedCsv }) {

    const [table, setTable] = useState(parsedCsv); // 2D array CSV file representation
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

        const tempTable = table.slice(1);
        tempTable.sort((a, b) => {
            if (revSort) {
                return a[colIdx] < b[colIdx] ? 1 : -1;
            } else {
                return a[colIdx] > b[colIdx] ? 1 : -1;
            }
        });
        const newTable = table.slice(0, 1).concat(tempTable);
        setTable(newTable);
    }

    return (
        <table>
            <tr>
                {table[0].map((header, colIdx) => 
                    <th key={colIdx} onClick={() => sortTable(colIdx)}>{header}</th>
                )}
            </tr>
            {table.map((subArr, rowIdx) => 
                <tr key={rowIdx}>
                    {rowIdx != 0 && subArr.map((val, colIdx) => 
                        <td key={colIdx}>
                            {val}
                        </td>
                    )}
                </tr>
            )}
        </table>
    );
}

export default TableDisplay

/*
<table>
            {props.parsedCsv.map((subArr, rowIdx) => 
                <tr key={rowIdx}>
                    {subArr.map((val, colIdx) => 
                        <td key={colIdx}>
                            {val}
                        </td>
                    )}
                </tr>
            )}
        </table>
*/