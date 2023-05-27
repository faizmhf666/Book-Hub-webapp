import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookshelvesItem = props => {
  const {detailsList} = props
  const {title, readStatus, id, rating, author, cover} = detailsList
  return (
    <li className="shelf-item-list">
      <Link to={`/books/${id}`} className="nav-link">
        <div className="shelf-item-container">
          <img src={cover} alt={title} className="shelf-img" />
          <div className="details-container">
            <h1 className="title">{title}</h1>
            <p className="author">{author}</p>
            <p className="rating">
              Avg Rating: <BsFillStarFill className="star" /> {rating}
            </p>
            <p className="rating">
              Status : <span className="read-status">{readStatus}</span>
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}
export default BookshelvesItem
