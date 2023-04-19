import { useState, useEffect } from 'react'

import Opening from './components/Opening'
import Questions from './components/Questions'
import './App.css'

function App() {

  const [gameStarted, setGameStarted] = useState(false)

  if(!gameStarted) {
    return (
      <Opening setGameStarted={setGameStarted} />
    )
  } else {
    return (
      <Questions />
    )
  }

}

export default App
