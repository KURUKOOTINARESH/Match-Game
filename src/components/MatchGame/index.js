import './index.css'
import {Component} from 'react'
import ThumbnailBar from '../ThumbnailBar'
import Thumbnail from '../Thumbnail'

class MatchGame extends Component {
  constructor(props) {
    super(props)
    const {imagesList} = this.props
    this.startTimer()
    this.state = {
      sec: 60,
      match: imagesList[0],
      thumbnail: 'FRUIT',
      score: 0,
      gameOver: false,
    }
  }

  startTimer = () => {
    this.intervalId = setInterval(() => {
      const {sec} = this.state
      if (sec === 0) {
        clearInterval(this.intervalId)
        this.setState({gameOver: true})
      } else {
        this.setState(prevState => ({sec: prevState.sec - 1}))
      }
    }, 1000)
  }

  onThumbnailBarClick = id => {
    this.setState({thumbnail: id})
  }

  onThumbnailImgClick = id => {
    const {match} = this.state
    const {imagesList} = this.props
    const randomIndex = Math.floor(Math.random() * 30)

    if (match.id === id) {
      this.setState(prevState => ({
        score: prevState.score + 1,
        match: imagesList[randomIndex],
      }))
    } else {
      clearInterval(this.intervalId)
      this.setState({gameOver: true})
    }
  }

  onPlayAgainButtonClick = () => {
    const {imagesList} = this.props
    this.startTimer()
    this.setState({
      sec: 60,
      match: imagesList[0],
      thumbnail: 'FRUIT',
      score: 0,
      gameOver: false,
    })
  }

  render() {
    const {sec, match, thumbnail, score, gameOver} = this.state
    const {imagesList, tabsList} = this.props

    const displayList = imagesList.filter(
      eachItem => eachItem.category === thumbnail,
    )

    const getDipsplay = !gameOver ? (
      <div className="match-con">
        <div className="match-img-con">
          <img src={match.imageUrl} alt="match" className="match" />
        </div>
        <ul className="thumbnail-nav-bar">
          {tabsList.map(eachItem => (
            <ThumbnailBar
              details={eachItem}
              key={eachItem.tabId}
              onThumbnailBarClick={this.onThumbnailBarClick}
              thumbnail={thumbnail}
            />
          ))}
        </ul>

        <ul className="thumbnail-con">
          {displayList.map(eachItem => (
            <Thumbnail
              details={eachItem}
              key={eachItem.id}
              onThumbnailImgClick={this.onThumbnailImgClick}
            />
          ))}
        </ul>
      </div>
    ) : (
      <div className="match-con">
        <div className="scorecard-con">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
            alt="trophy"
            className="trophy"
          />
          <p className="result-text">Your Score</p>
          <p className="result-text">{score}</p>
          <button
            type="button"
            className="play-again-btn"
            onClick={this.onPlayAgainButtonClick}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
              alt="reset"
            />
            <p>PLAY AGAIN</p>
          </button>
        </div>
      </div>
    )

    return (
      <div className="app-con">
        <ul className="nav-bar">
          <li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png "
              alt="website logo"
              className="logo"
            />
          </li>

          <li className="nav-results-con">
            <div className="score-con">
              <p>Score:</p>
              <p className="bold-text">{score}</p>
            </div>
            <div className="timer-con">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer"
              />
              <p className="bold-text">{sec} Sec</p>
            </div>
          </li>
        </ul>
        {getDipsplay}
      </div>
    )
  }
}
export default MatchGame
