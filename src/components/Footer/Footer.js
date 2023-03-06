import Logo from "../../Assets/Logo.png";
import Insta from "../../Assets/insta.png";
import Youtube from "../../Assets/youtube.png";
import Linkedin from "../../Assets/linkedIn.png";
import Twitter from "../../Assets/twitter.png";
import Input from "../../UI/Input/Input";
import Mail from "../../Assets/Mail.png";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="icons">
        <div className="logo">
          <img src={Logo} alt="Logo of the website" />
        </div>
        <div className="social-links">
          <span>Social Media</span>
          <ul>
            <li>
              <img src={Twitter} alt="twitter icon" />
            </li>
            <li>
              <img src={Linkedin} alt="linkedin icon" />
            </li>
            <li>
              <img src={Youtube} alt="youtube icon" />
            </li>
            <li>
              <img src={Insta} alt="insta icon" />
            </li>
          </ul>
        </div>
      </div>
      <div className="site-map">
        <h3>SITEMAP</h3>
        <ul className="links">
          <li>Home</li>
          <li>Contact</li>
          <li>About</li>
        </ul>
      </div>
      <div className="content">
        <h3>HEAD OFFICE</h3>
        <p>
          Xilliams Corner Wine &copy; 2017. 1112 A Market St # Ste B22,
          Charlottesville, CA 45565
        </p>
        <h4>NEWS LETTER</h4>
        <Input placeholder="EMAIL ADDRESS" icon={Mail} />
      </div>
      <p className="copyright">© 2022 Monke Group All rights reserved.</p>
    </div>
  );
};
export default Footer;
