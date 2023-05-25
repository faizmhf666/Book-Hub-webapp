import {Link} from 'react-router-dom'

const TopRatedBooks = props => {
  const {bookDetails} = props
  const {title, cover, author, id} = bookDetails
  return (
    <li>
      <Link to={`/books/${id}`}>
        <img src={cover} alt={title} />
        <h1>{title}</h1>
        <p>{author}</p>
      </Link>
    </li>
  )
}
export default TopRatedBooks
