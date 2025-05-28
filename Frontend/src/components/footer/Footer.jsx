import './Footer.css';
import { FaInstagram, FaPinterestP, FaTwitter, FaYoutube } from 'react-icons/fa';

function Footer() {
  return (
    <div className='footer text-white p-4'>
      <div className='footer-content'>
        <h2>Contact Us</h2>
        <div className='social-media-links'>
          <a href="https://www.instagram.com/etsy/" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaInstagram size={30} />
          </a>
          <a href="https://www.pinterest.com/etsy/" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaPinterestP size={30} />
          </a>
          <a href="https://x.com/etsy" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaTwitter size={30} />
          </a>
          <a href="https://www.youtube.com/user/etsy" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaYoutube size={30} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
