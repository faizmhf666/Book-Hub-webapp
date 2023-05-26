import {
  FaGoogle,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaGithub,
} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="contact-us-container">
    <div className="icon-container">
      <a href="https://www.google.com/">
        <FaGoogle className="footer-icon" />
      </a>
      <a href="https://github.com/faizmhf666">
        <FaGithub className="footer-icon" />
      </a>

      <a href="https://twitter.com/mhf1997_">
        <FaTwitter className="footer-icon" />
      </a>

      <a href="https://www.instagram.com/zack.the.jack.1/">
        <FaInstagram className="footer-icon" />
      </a>
      <a href="https://www.youtube.com/channel/UCkW1K0PGa5HDp192iB8QbZQ">
        <FaYoutube className="footer-icon" />
      </a>
    </div>
    <p className="contact-us">Contact Us</p>
  </div>
)

export default Footer
