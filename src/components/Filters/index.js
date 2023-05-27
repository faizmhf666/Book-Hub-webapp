import './index.css'

const Filters = props => {
  const {bookShelfListDetails, isActive, changeBookshelf} = props
  const {id, label, value} = bookShelfListDetails
  const onchangeBookshelf = () => {
    changeBookshelf(id)
  }
  const buttonStyle = isActive ? 'selected-btn' : 'shelf-btn '
  return (
    <li className="list-style">
      <button
        type="button"
        value={value}
        id={id}
        onClick={onchangeBookshelf}
        className={`btn  ${buttonStyle}`}
      >
        {label}
      </button>
    </li>
  )
}
export default Filters
