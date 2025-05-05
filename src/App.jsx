import React from 'react'
import { useState } from 'react'
import InteractiveTable from './components/InteractiveTable'
import './App.css'
import ToggleEditButton from './components/ToggleEditButton'

const exampleFile = [
  ["Name", "Position", "Appearances", "Goals", "Assists"],
  ["Ederson", "GK", 34, 0, 4],
  ["Ruben Dias", "CB", 37, 0, 0],
  ["Bernardo Silva", "CM", 45, 4, 4],
  ["Kevin De Bruyne", "CM", 36, 6, 8],
  ["Erling Haaland", "ST", 40, 30, 4],
  ["Phil Foden", "RW", 42, 10, 6],
];

function App() {
  const [parsedCsv, setParsedCsv] = useState(exampleFile)
  const [rowEditIdx, setRowEditIdx] = useState(-1);
  const [colEditIdx, setColEditIdx] = useState(-1);
  const [editMode, setEditMode] = useState(false);

  const updateParsedCsv = (updatedCsv) => {
    setParsedCsv(updatedCsv);
  }

  const updateEditIdx = (rowIdx, colIdx) => {
    setRowEditIdx(rowIdx);
    setColEditIdx(colIdx);
  }

  const updateEditModeStatus = (status) => {
    setEditMode(status);
  }

  const addEmptyRow = () => {
    const newTable = parsedCsv.map(subArr => [ ...subArr ]); // cloning
    const newSubArr = [];
    
    for (let i = 0; i < newTable[0].length; i++) {
      newSubArr.push("");
    }
    newTable.push(newSubArr)

    setParsedCsv(newTable);
  }

  return (
    <>
      <h1>hello world</h1>
      <InteractiveTable 
        parsedCsv={parsedCsv}
        updateParsedCsv={updateParsedCsv}
        editMode={editMode}
        rowEditIdx={rowEditIdx}
        colEditIdx={colEditIdx}
        updateEditIdx={updateEditIdx}
      />
      <ToggleEditButton
        editMode={editMode}
        updateEditModeStatus={updateEditModeStatus}
        updateEditIdx={updateEditIdx}
      />
      <button onClick={() => addEmptyRow()}>Add Row</button>
    </>
  )
}

export default App
