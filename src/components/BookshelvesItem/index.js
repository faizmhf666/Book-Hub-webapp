import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'

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
          Avg Rating: <BsFillStarFill /> {rating}
        </p>
        <p>
          Status : <span>{readStatus}</span>
        </p>
      </Link>
    </li>
  )
}
export default BookshelvesItem
