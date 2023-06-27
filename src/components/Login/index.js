import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showLoginError: false, error: ''}

  inputUsername = event => {
    this.setState({username: event.target.value})
  }

  inputPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 1})
      const {history} = this.props
      history.replace('/')
    } else {
      const errorMsg = data.error_msg
      this.setState({
        showLoginError: true,
        error: errorMsg,
      })
    }
  }

  render() {
    const {username, password, showLoginError, error} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/dvu0weqay/image/upload/v1684910555/BookHub/Book_Login_ht1xto.png"
          alt="website login"
          className="book-image-sm"
        />
        <img
          src="https://res.cloudinary.com/dvu0weqay/image/upload/v1685019697/BookHub/large-book_whkwwb.png"
          alt="website login"
          className="book-image-lg"
        />
        <div className="form-container">
          <form onSubmit={this.onSubmitForm} className="login-form-card">
            <img
              src="https://res.cloudinary.com/dvu0weqay/image/upload/v1684910554/BookHub/BookHub_Logo_cszgu6.png"
              alt="login website logo"
              className="website-logo"
            />
            <label htmlFor="username" className="form-label">
              Username*
            </label>
            <input
              type="text"
              id="username"
              onChange={this.inputUsername}
              value={username}
              placeholder="Username is rahul"
              className="input-box"
            />
            <label htmlFor="password" className="form-label">
              Password*
            </label>
            <input
              type="password"
              id="password"
              onChange={this.inputPassword}
              value={password}
              placeholder="Password is rahul@2021"
              className="input-box"
            />
            {showLoginError && <p className="error-message">*{error}</p>}
            <button type="submit" className="submit-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
