import React, { Suspense } from 'react'
import MainPage from "./components/MainPage";

function App() {
  return (
    <Suspense fallback="loading">
      <div className="app">
        <MainPage/>
      </div>
    </Suspense>
  )
}

export default App
