import {Link} from 'react-router-dom'

const NotFound = () => {
  const imageUrlNotFound =
    'https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png'
  return (
    <div className="not-found-container">
      <img src={imageUrlNotFound} alt="not found" />
      <h1>Page Not Found</h1>
      <p>
        We are sorry, the page you requested could not be found. Please go back
        to homepage.
      </p>
      <Link to="/">
        <button type="button">Go Back to Home</button>
      </Link>
    </div>
  )
}
export default NotFound
