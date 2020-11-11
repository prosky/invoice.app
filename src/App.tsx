import React from 'react'
import InvoicePage from './components/InvoicePage'
import GoogleDrive from './GoogleDrive'


function App() {
  return (
    <div className="app">
      <h1 className="center primary fs-30">React Invoice Generator</h1>
      <GoogleDrive/>
      <InvoicePage />
    </div>
  )
}

export default App
