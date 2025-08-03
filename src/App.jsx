import React from 'react'
import { useState } from 'react'
import InteractiveTable from './components/InteractiveTable'
import './App.css'
import ToggleEditButton from './components/ToggleEditButton'
import Header from './components/Header'
import UploadForm from './components/UploadForm'
import Footer from './components/Footer'

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
        const value = csvString.slice(startIdx, endIdx);
        // Convert to number if possible, otherwise keep as string
        const numValue = parseFloat(value);
        subArr.push(!isNaN(numValue) && value.trim() !== '' ? numValue : value);
        console.log(csvString.slice(startIdx, endIdx));
        console.log(subArr);
        startIdx = endIdx + 1;
        if (csvString[endIdx] == '\n') {
          table.push([...subArr]);
          subArr.splice(0, subArr.length);
        }
      } else if (csvString[endIdx] == '\r') {
        console.log("Unexpected escape character found");
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Upload Section */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Upload Data</h2>
            <UploadForm onFileUpload={handleFileInput} />
          </section>

                     {/* Table Section */}
           <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
             <div className="flex items-center justify-between mb-6">
               <h2 className="text-lg font-semibold text-gray-800">Data Table</h2>
               <div className="text-sm text-gray-500">
                 {parsedCsv.length > 1 ? `${parsedCsv.length - 1} rows, ${parsedCsv[0]?.length || 0} columns` : 'No data loaded'}
               </div>
             </div>
             
             <InteractiveTable 
               parsedCsv={parsedCsv}
               updateParsedCsv={updateParsedCsv}
               editMode={editMode}
               rowEditIdx={rowEditIdx}
               colEditIdx={colEditIdx}
               updateEditIdx={updateEditIdx}
             />

             {/* Table Controls */}
             <div className="mt-6 pt-6 border-t border-gray-200">
               <div className="flex flex-wrap items-center justify-between gap-4">
                 {/* Left side - Edit and Structure controls */}
                 <div className="flex flex-wrap items-center gap-4">
                   <div className="flex items-center gap-2">
                     <span className="text-sm font-medium text-gray-700">Edit:</span>
                     <ToggleEditButton
                       editMode={editMode}
                       updateEditModeStatus={updateEditModeStatus}
                       updateEditIdx={updateEditIdx}
                     />
                   </div>
                   
                   <div className="flex items-center gap-2">
                     <span className="text-sm font-medium text-gray-700">Add:</span>
                     <button 
                       onClick={addEmptyRow} 
                       className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium px-3 py-2 rounded text-sm border border-blue-200 transition-colors"
                     >
                       Row
                     </button>
                     <button 
                       onClick={addEmptyCol} 
                       className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium px-3 py-2 rounded text-sm border border-blue-200 transition-colors"
                     >
                       Column
                     </button>
                   </div>
                 </div>

                 {/* Right side - Download */}
                 <button 
                   onClick={handleDownload} 
                   className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm"
                 >
                   Download CSV
                 </button>
               </div>
             </div>
           </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
