import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import Cookies from 'js-cookie'

import './index.css'

class Header extends Component {
  state = {
    isClicked: false,
    activeId: '',
  }

  showNavButton = () => {
    this.setState({isClicked: true})
  }

  hideNavButton = () => {
    this.setState({isClicked: false})
  }

  executeLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  changeActiveIdShelf = () => {
    this.setState({activeId: 'shelf'})
  }

  changeActiveIdHome = () => {
    this.setState({activeId: 'home'})
  }

  renderSmallScreen = () => {
    const {activeId} = this.state
    return (
      <ul className="nav-menu">
        <Link to="/" className="nav-link">
          <li
            onClick={this.changeActiveIdHome}
            className={activeId === 'home' ? 'active-tab' : 'tab-item'}
          >
            Home
          </li>
        </Link>
        <Link to="/shelf" className="nav-link">
          <li
            onClick={this.changeActiveIdShelf}
            className={activeId === 'shelf' ? 'active-tab' : 'tab-item'}
          >
            Bookshelves
          </li>
        </Link>
        <li>
          <button
            type="button"
            className="logout-btn"
            onClick={this.executeLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    )
  }

  render() {
    const {isClicked} = this.state
    return (
      <nav className="nav-bar-container">
        <div className="desktop-screen">
          <Link to="/" className="nav-link-img">
            <img
              src="https://res.cloudinary.com/dvu0weqay/image/upload/v1684910554/BookHub/BookHub_Logo_cszgu6.png"
              alt="website logo"
              className="website logo"
            />
          </Link>
          {this.renderSmallScreen()}
        </div>
        <div className="mobile-screen">
          <Link to="/" className="nav-link-img">
            <img
              src="https://res.cloudinary.com/dvu0weqay/image/upload/v1684910554/BookHub/BookHub_Logo_cszgu6.png"
              alt="website logo"
              className="website logo"
            />
          </Link>
          <button
            type="button"
            onClick={this.showNavButton}
            className="icon-button"
          >
            <GiHamburgerMenu />
          </button>
        </div>
        <div className="small-container">
          {isClicked && (
            <div className="show-buttons">
              {this.renderSmallScreen()}
              <button
                type="button"
                onClick={this.hideNavButton}
                className="icon-button x-btn"
              >
                <AiFillCloseCircle className="close-icon" />
              </button>
            </div>
          )}
        </div>
      </nav>
    )
  }
}
export default withRouter(Header)
