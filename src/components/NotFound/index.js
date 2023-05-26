import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => {
  const imageUrlNotFound =
    'https://res.cloudinary.com/dvu0weqay/image/upload/v1684910553/BookHub/Page_not_found_vpjziu.png'
  return (
    <div className="not-found-container">
      <img src={imageUrlNotFound} alt="not found" className="not-found-img" />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-para">
        We are sorry, the page you requested could not be found. Please go back
        to homepage.
      </p>
      <Link to="/">
        <button type="button" className="home-btn">
          Go Back to Home
        </button>
      </Link>
    </div>
  )
}
export default NotFound
