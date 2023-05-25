import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'

const BookshelvesItem = props => {
  const {detailsList} = props
  const {title, readStatus, id, rating, author, cover} = detailsList
  return (
    <li>
      <Link to={`/books/${id}`}>
        <img src={cover} alt={title} />
        <h1>{title}</h1>
        <p>{author}</p>
        <p>
          Avg Rating: <FaStar /> {rating}
        </p>
        <p>Status : {readStatus}</p>
      </Link>
    </li>
  )
}
export default BookshelvesItem