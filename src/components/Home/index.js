import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, Redirect} from 'react-router-dom'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const callStatusCodes = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    topRatedList: [],
    apiCallStatus: '',
  }

  componentDidMount() {
    this.getBooksList()
  }

  onTryAgain = () => {
    this.getBooksList()
  }

  getBooksList = async () => {
    this.setState({apiCallStatus: callStatusCodes.loading})
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const apiCall = await fetch(apiUrl, options)
    if (apiCall.ok === true) {
      const response = await apiCall.json()
      const updatedData = response.books.map(each => ({
        id: each.id,
        author: each.author_name,
        cover: each.cover_pic,
        title: each.title,
      }))
      this.setState({
        topRatedList: updatedData,
        apiCallStatus: callStatusCodes.success,
      })
    } else {
      this.setState({apiCallStatus: callStatusCodes.failure})
    }
  }

  onClickFindBooks = () => {
    const {history} = this.props
    history.replace('/shelf')
  }

  renderBookCard = () => {
    const {topRatedList} = this.state
    const settings = {
      dots: false,
      infinite: false,
      autoplay: true,
      slidesToScroll: 1,
      slidesToShow: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 786,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <Slider {...settings}>
        {topRatedList.map(each => (
          <li key={each.id}>
            <Link to={`/books/${each.id}`}>
              <img src={each.cover} alt={each.title} />
              <h1>{each.title}</h1>
              <p>{each.author}</p>
            </Link>
          </li>
        ))}
      </Slider>
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
        return this.renderBookCard()
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
        <h1>Find Your Next Favorite Books?</h1>
        <p>
          You are in the right place. Tell us what titles or genres you have
          enjoyed in the past, and we will give you surprisingly insightful
          recommendations.
        </p>
        <div>
          <div>
            <ul>
              <li>
                <h1>Top Rated Books</h1>
              </li>
              <li>
                <button type="button" onClick={this.onClickFindBooks}>
                  Find Books
                </button>
              </li>
            </ul>
            <div>{this.renderBookCard()}</div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
