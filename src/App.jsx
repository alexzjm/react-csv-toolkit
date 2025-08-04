import React from 'react'
import { useState } from 'react'
import InteractiveTable from './components/InteractiveTable'
import './App.css'
import ToggleEditButton from './components/ToggleEditButton'
import Header from './components/Header'
import UploadForm from './components/UploadForm'
import Footer from './components/Footer'

const realMadridGoals = [
  ["Player", "La Liga", "Copa del Rey", "UCL", "Supercopa", "UEFA Super Cup", "Intercontinental Cup", "Club World Cup", "Total"],
  ["Kylian Mbappé", 31, 2, 7, 1, 1, 1, 1, 44],
  ["Vinícius Júnior", 11, 1, 8, 0, 0, 1, 1, 22],
  ["Jude Bellingham", 9, 1, 3, 1, 0, 0, 1, 15],
  ["Rodrygo", 6, 0, 5, 2, 0, 1, 0, 14],
  ["Federico Valverde", 6, 2, 0, 0, 1, 0, 2, 11],
  ["Endrick", 1, 5, 1, 0, 0, 0, 0, 7],
  ["Brahim Díaz", 4, 0, 2, 0, 0, 0, 0, 6],
  ["Arda Güler", 3, 2, 0, 0, 0, 0, 1, 6],
  ["Gonzalo García", 0, 1, 0, 0, 0, 0, 4, 5],
  ["Luka Modrić", 2, 2, 0, 0, 0, 0, 0, 4],
  ["Antonio Rüdiger", 0, 1, 2, 0, 0, 0, 0, 3],
  ["Eduardo Camavinga", 1, 1, 0, 0, 0, 0, 0, 2],
  ["Aurélien Tchouaméni", 0, 2, 0, 0, 0, 0, 0, 2],
  ["Lucas Vázquez", 1, 0, 1, 0, 0, 0, 0, 2],
  ["Dani Carvajal", 1, 0, 0, 0, 0, 0, 0, 1],
  ["Éder Militão", 1, 0, 0, 0, 0, 0, 0, 1],
  ["Fran García", 0, 0, 0, 0, 0, 0, 1, 1],
  ["Jacobo Ramón", 1, 0, 0, 0, 0, 0, 0, 1],
  ["Own goals", 0, 0, 0, 1, 0, 0, 0, 1],
];

function App() {
  const [parsedCsv, setParsedCsv] = useState(realMadridGoals);
  const [rowEditIdx, setRowEditIdx] = useState(-1);
  const [colEditIdx, setColEditIdx] = useState(-1);
  const [editMode, setEditMode] = useState(false);
  const [originalFileName, setOriginalFileName] = useState('');

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
      setOriginalFileName(file.name);
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
    a.download = originalFileName || "untitled.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
                     {/* Upload Section */}
           <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
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
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ToggleEditButton
                      editMode={editMode}
                      updateEditModeStatus={updateEditModeStatus}
                      updateEditIdx={updateEditIdx}
                    />
                    <button 
                      onClick={addEmptyRow} 
                      className="text-gray-600 hover:text-gray-800 cursor-pointer px-2 py-1 text-sm transition-colors"
                    >
                      + Row
                    </button>
                    <button 
                      onClick={addEmptyCol} 
                      className="text-gray-600 hover:text-gray-800 cursor-pointer px-2 py-1 text-sm transition-colors"
                    >
                      + Column
                    </button>
                  </div>
                  <button 
                    onClick={handleDownload} 
                    className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium text-sm transition-colors"
                  >
                    Download
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
