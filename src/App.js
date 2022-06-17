import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from 'react'
import words from './words'
import { ToastContainer, toast } from 'react-toastify'
import messages from './messages'

function App() {
  //
  const [time, setTime] = useState(5)
  const [word, setWord] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [highscore, setHighscore] = useState(0)
  const [message, setMessage] = useState('')
  const [typedValue, setTypedValue] = useState('')
  const [showBallons, setShowBallons] = useState(false)
  const [name, setName] = useState('')
  const [nameValue, setNameValue] = useState('')
  const [winMessage, setWinMessage] = useState('')

  const notify = () =>
    toast(winMessage, {
      position: 'bottom-center',
      autoClose: 3000,
      closeOnClick: true,
      delay: 0,
      type: 'success',
      theme: 'colored',
    })
  const error = () =>
    toast('Sorry. You lost!', {
      position: 'bottom-center',
      autoClose: 3000,
      closeOnClick: true,
      delay: 0,
      type: 'error',
      theme: 'colored',
    })

  useEffect(() => {}, [])

  useEffect(() => {
    showWord()
    const HS = localStorage.getItem('highscore')
    const NM = localStorage.getItem('name')
    if (HS) {
      setHighscore(HS)
    } else setHighscore(0)
    if (NM) {
      setName(NM)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(checkstatus, 500)
    return () => clearInterval(interval)
  }, [time, isPlaying])

  useEffect(() => {
    const int = setInterval(countdown, 1000)
    return () => clearInterval(int)
  }, [time])

  function startMatch(e) {
    if (matchWords(e)) {
      setScore(score + 1)
    }
    //set new highscore if it is higher than the current highscore
    if (score >= highscore) {
      setShowBallons(true)
      setHighscore(score)
      localStorage.setItem('highscore', highscore)
    }
  }

  function matchWords(e) {
    setMessage('')
    if (e.target.value === word) {
      setIsPlaying(true)
      notify()
      setTypedValue('')
      showWord()
      setTime(5)
      setScore(score + 1)
      return true
    } else {
      setMessage('')

      return false
    }
  }

  function showWord() {
    const randIndex = Math.floor(Math.random() * words.length)
    setWord(words[randIndex])
  }

  function countdown() {
    if (time > 0) {
      const randIndex = Math.floor(Math.random() * messages.length)
      setWinMessage(messages[randIndex])
      setTime(time - 1)
    }
  }

  function checkstatus() {
    if (isPlaying === true && time === 0) {
      console.log('IS PLAYING AND TIME IS 0', isPlaying, time)
      setMessage('Game Over!. Try again')
      setScore(0)
      setIsPlaying(false)
      error()
    }
  }

  return (
    <div>
      <header className="bg-secondary text-center p-2 mb-4">
        <h1>SpeedType</h1>
        <h5>Made with 💖 By Phumudzo</h5>
      </header>
      <ToastContainer />
      <div className="container text-center">
        {!name ? (
          <div className="row">
            <div className="mt-5 col-md-6 mx-auto">
              <h3>Hi. What's Up? 😉🚀</h3>
              <p>Enter your name to start playing</p>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter your name"
                onChange={(e) => setNameValue(e.target.value)}
                value={nameValue}
              />
              <button
                className="btn-primary px-4 py-2 mt-4"
                onClick={() => {
                  setName(nameValue)
                  localStorage.setItem('name', nameValue)
                }}
              >
                Enter the game
              </button>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-6 mx-auto">
              <p className="lead">
                Hello <span className="font-weight-bold">{name}</span>. Type the
                WORD within
                <span className="text-danger font-weight-bold" id="seconds">
                  {' '}
                  5
                </span>{' '}
                seconds
              </p>
              <h2 className="display-4 mb-4 font-weight-bold" id="current-word">
                {word}
              </h2>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Start Typing...."
                id="word-input"
                value={typedValue}
                onChange={(event) => {
                  setTypedValue(event.target.value)
                  startMatch(event)
                }}
              />
              {!message ? (
                <h4 className="mt-3  font-weight-bold">
                  Time Left: <span className="text-danger"> {time}</span>
                </h4>
              ) : (
                <h4 className="mt-3 text-danger font-weight-bold" id="message">
                  {message}
                </h4>
              )}

              <div className="row mt-4">
                <div className="col-sm-6 bg-primary p-2">
                  <h4 className="font-weight-bold">Current Score: {score}</h4>
                </div>
                <div className="col-sm-6 bg-danger p-2">
                  <h4 className="font-weight-bold">High Score: {highscore}</h4>
                </div>
              </div>

              {showBallons && (
                <img
                  src="./hs.png"
                  className="mt-5"
                  style={{
                    height: 70,
                  }}
                />
              )}

              <div className="row mt-5 mb-4">
                <div className="col-md-12 mt-3">
                  <div className="card card-body bg-secondary text-white">
                    <h5>Instructions</h5>
                    <p>
                      Type each word within the given amount of seconds. If you
                      fail, your game will be over, to start again, you simply
                      type the given word, and your game will start again
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
