import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import BookshelvesItem from '../BookshelvesItem'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const callStatusCodes = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Bookshelves extends Component {
  state = {
    requiredList: [],
    bookshelfName: '',
    apiCallStatus: callStatusCodes.loading,
    searchText: '',
  }

  componentDidMount() {
    this.getBookDetails()
  }

  onSearchInput = event => {
    this.setState({searchText: event.target.value})
  }

  onSearchSubmit = event => {
    event.preventDefault()
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({apiCallStatus: callStatusCodes.loading})
    const {bookshelfName, searchText} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`
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
        title: each.title,
        readStatus: each.read_status,
        rating: each.rating,
        author: each.author_name,
        cover: each.cover_pic,
      }))
      this.setState({
        requiredList: updatedData,
        apiCallStatus: callStatusCodes.success,
      })
    } else {
      this.setState({
        apiCallStatus: callStatusCodes.failure,
      })
    }
  }

  renderBooksList = () => {
    const {requiredList} = this.state
    return (
      <div>
        {requiredList.map(each => (
          <BookshelvesItem detailsList={each} key={each.id} />
        ))}
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailView = () => {
    const {searchText} = this.state
    return (
      <div>
        <img
          src="https://res.cloudinary.com/dvu0weqay/image/upload/v1684910554/BookHub/not_found_flqg6r.png"
          alt="error"
        />
        <p>Your search for {searchText} did not find any matches.</p>
      </div>
    )
  }

  renderPortView = () => {
    const {apiCallStatus} = this.state

    switch (apiCallStatus) {
      case callStatusCodes.success:
        return this.renderBooksList()
      case callStatusCodes.failure:
        return this.renderFailView()
      case callStatusCodes.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <form onSubmit={this.onSearchSubmit}>
            <h1>All Books</h1>
            <input
              type="search"
              placeholder="search"
              onChange={this.onSearchInput}
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
          {this.renderPortView()}
          <Footer />
        </div>
      </div>
    )
  }
}
export default Bookshelves
