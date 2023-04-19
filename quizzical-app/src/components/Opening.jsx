import blobOne from '../assets/blob 5.png'
import blobTwo from '../assets/blob 4.png'

function Opening({setGameStarted}) {
    return (
        <div className="welcome-page">
          <div className="welcome-page-container">
            <h1>Quizzical</h1>
            <p>Welcome to Quizzical, a fun and challenging trivia game!</p>
            <button className='start__btn' onClick={() => setGameStarted(true)}>Start Game</button>
            <img src={blobOne} className="shape-yellow" alt="logo" />
            <img src={blobTwo} className="shape-blue" alt="logo" />
          </div>
        </div>
      )
}

export default Opening