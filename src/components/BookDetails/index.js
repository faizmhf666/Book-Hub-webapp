import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const callStatusCodes = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookDetails extends Component {
  state = {
    apiCallStatus: '',
    bookDetailsList: {},
  }

  componentDidMount = () => {
    this.getBookDetailsList()
  }

  getBookDetailsList = async () => {
    this.setState({apiCallStatus: callStatusCodes.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const apiCall = await fetch(apiUrl, options)
    if (apiCall.ok === true) {
      const response = await apiCall.json()
      const updatedData = {
        aboutAuthor: response.book_details.about_author,
        aboutBook: response.book_details.about_book,
        author: response.book_details.author_name,
        cover: response.book_details.cover_pic,
        id: response.book_details.id,
        rating: response.book_details.rating,
        readStatus: response.book_details.read_status,
        title: response.book_details.title,
      }
      this.setState({
        apiCallStatus: callStatusCodes.success,
        bookDetailsList: updatedData,
      })
    } else {
      this.setState({apiCallStatus: callStatusCodes.failure})
    }
  }

  onTryAgain = () => {
    this.getBookDetailsList()
  }

  renderBookDetails = () => {
    const {bookDetailsList} = this.state
    return (
      <div>
        <div className="details-card-container">
          <div className="details-item-container">
            <img
              className="details-img"
              src={bookDetailsList.cover}
              alt={bookDetailsList.title}
            />
            <div className="details-container">
              <h1 className="title">{bookDetailsList.title}</h1>
              <p className="author">{bookDetailsList.author}</p>
              <p className="rating">
                Avg Rating: <BsFillStarFill className="star" />{' '}
                {bookDetailsList.rating}
              </p>
              <p className="rating">
                Status:
                <span className="read-status">
                  {bookDetailsList.readStatus}
                </span>
              </p>
            </div>
          </div>
          <hr />
          <div className="additional-details">
            <h2 className="about-author">About Author</h2>
            <p className="author-details">{bookDetailsList.aboutAuthor}</p>
            <h2 className="about-author">About Book</h2>
            <p className="author-details">{bookDetailsList.aboutBook}</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dvu0weqay/image/upload/v1684910554/BookHub/error_cvnfet.png"
        alt="failure view"
      />
      <p>Something went wrong, Please try again.</p>
      <button type="button" onClick={this.onTryAgain}>
        Try Again
      </button>
    </div>
  )

  renderPortView = () => {
    const {apiCallStatus} = this.state

    switch (apiCallStatus) {
      case callStatusCodes.success:
        return this.renderBookDetails()
      case callStatusCodes.failure:
        return this.renderFailView()
      case callStatusCodes.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div>
        <Header />
        <div className="page-container">{this.renderPortView()}</div>
      </div>
    )
  }
}
export default BookDetails
