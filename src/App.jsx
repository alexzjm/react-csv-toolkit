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
  const [parsedCsv, setParsedCsv] = useState(exampleFile);
  const [rowEditIdx, setRowEditIdx] = useState(-1);
  const [colEditIdx, setColEditIdx] = useState(-1);
  const [editMode, setEditMode] = useState(false);

  const parseCsv = (csvString) => {
    const table = [];
    let startIdx = 0, endIdx = 0;
    const subArr = [];
    if (!csvString) {
      console.log("NOT FOUND");
      return;
    }
    console.log("the length of the input csvstring is " + csvString.length);
    while (endIdx < csvString.length) {
      if (csvString[endIdx] == ',' || csvString[endIdx] == '\n') {
        subArr.push(csvString.slice(startIdx, endIdx));
        console.log(csvString.slice(startIdx, endIdx));
        console.log(subArr);
        startIdx = endIdx + 1;
        if (csvString[endIdx] == '\n') {
          table.push([...subArr]);
          subArr.splice(0, subArr.length);
        }
      } else if (csvString[endIdx] == '\r') {
        console.log("what the fuck is this doing here");
      }
      endIdx++;
    }

    return table;
  }

  const handleFileInput = (files) => {
    const file = files[0];

    if (file) {
      console.log(file.name + " has been successfully uploaded")
    } else {
      console.log("error submitting file")
    }

    const reader = new FileReader();
    let csvString;

    reader.onload = (event) => {
      csvString = event.target.result;
      console.log(event.target.result);
      console.log(event.target.result.length);
      setParsedCsv(parseCsv(event.target.result));
    }

    console.log(csvString);

    reader.readAsText(file);

    console.log(csvString);
  }

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
      newSubArr.push("-");
    }
    newTable.push(newSubArr)

    setParsedCsv(newTable);
  }

  const addEmptyCol = () => {
    const newTable = parsedCsv.map(subArr => [ ...subArr, "-"]);
    setParsedCsv(newTable);
  }

  const handleDownload = () => {
    const csvString = parsedCsv.map(row => row.join(",")).join("\n");

    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "untitled.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">CSV Editor/Viewer</h1>
        <p className="text-gray-600 mb-2">
          A web-based CSV file viewer and editor built with React. 
          Users can upload CSV files, display them in a dynamic, 
          interactive table, and perform actions such as sorting, 
          searching, editing, and downloading modified data. 
          The project emphasizes component-based architecture, 
          React state management, file parsing, and client-side 
          file generation without a backend.
        </p>
        <p className="text-gray-600 mb-2">
          Get started by uploading a csv file from your local! 
          Then, feel free to modify it! Click on a header to sort
          by column. Use edit mode to edit specific cells. 
          When you're done, click the download button to save your progress!
        </p>
        <p className="text-sm text-gray-500 italic mb-4">
          Author: Alex Zhang
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <form className="block mb-4">
          <input type="file" accept=".csv" onChange={e => handleFileInput(e.target.files)} className="mt-2 block w-full border border-gray-300 rounded px-3 py-2 text-sm shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
        </form>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <InteractiveTable 
          parsedCsv={parsedCsv}
          updateParsedCsv={updateParsedCsv}
          editMode={editMode}
          rowEditIdx={rowEditIdx}
          colEditIdx={colEditIdx}
          updateEditIdx={updateEditIdx}
        />
      </div>
      <div className="flex justify-center flex-wrap gap-3 mt-6">
        <ToggleEditButton
          editMode={editMode}
          updateEditModeStatus={updateEditModeStatus}
          updateEditIdx={updateEditIdx}
        />
        <button onClick={addEmptyRow} className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded text-sm shadow-sm border border-blue-200">Add Row</button>
        <button onClick={addEmptyCol} className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded text-sm shadow-sm border border-blue-200">Add Column</button>
        <button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-sm text-sm">Download</button>
      </div>
    </>
  )
}

export default App
