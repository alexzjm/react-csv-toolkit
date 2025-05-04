import React from 'react'
import { useState } from 'react'
import Test from './components/Test'
import TableDisplay from './components/TableDisplay'
import './App.css'

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

  return (
    <>
      <h1>hello world</h1>
      <Test />
      <TableDisplay parsedCsv={parsedCsv}/>
    </>
  )
}

export default App
