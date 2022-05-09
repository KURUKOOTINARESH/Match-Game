import './index.css'

const ThumbnailBar = props => {
  const {details, onThumbnailBarClick, thumbnail} = props
  const {tabId, displayText} = details
  const className = thumbnail === tabId ? 'button selected-btn' : 'button'
  const onButtonClick = () => {
    onThumbnailBarClick(tabId)
  }
  return (
    <li>
      <button type="button" className={className} onClick={onButtonClick}>
        {displayText}
      </button>
    </li>
  )
}
export default ThumbnailBar
