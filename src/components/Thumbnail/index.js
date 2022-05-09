import './index.css'

const Thumbnail = props => {
  const {details, onThumbnailImgClick} = props
  const {id, thumbnailUrl} = details
  const onButtonClick = () => {
    onThumbnailImgClick(id)
  }
  return (
    <li>
      <button type="button" className="thumbnail-btn" onClick={onButtonClick}>
        <img src={thumbnailUrl} alt="thumbnail" className="thumbnail-img" />
      </button>
    </li>
  )
}
export default Thumbnail
