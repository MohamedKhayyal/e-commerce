import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
  return (
    <div className="cart-container">
      <p>
        Home / <b>Contact</b>
      </p>
      <div className="contact-field d-flex align-items-center justify-content-between flex-wrap">
        <div className="contact-call d-flex flex-column head-detail d-flex  shadow mb-5 rounded">
          <div className="calls d-flex align-items-center">
            <div className="calls-call">
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <div className="p">
              <p>Call To Us</p>
            </div>
          </div>
          <div className="text" style={{ borderBottom: "1px solid #000000" }}>
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone: +8801611112222</p>
          </div>
          <div className="contact-mail d-flex align-items-center flex-column">
            <div className="contact-contact d-flex align-items-center" style={{gap:"10px",marginBottom:"20px"}}>
              <div className="calls-call">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className="p">
                <p>Write To US</p>
              </div>
            </div>
            <div className="text">
              <p>Fill out our form and we will contact you within 24 hours.</p>
              <p>Emails: customer@exclusive.com</p>
              <p>Emails: support@exclusive.com</p>
            </div>
          </div>
        </div>
        <div className="contact-input d-flex flex-column head-detail shadow mb-5 rounded">
          <div className="input-name d-flex align-items-center gap-2">
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <input type="text" placeholder="Your Phone" />
          </div>
          <textarea placeholder="Your Massage"></textarea>
          <div className="button">
            <button>Send Massage</button>
          </div>
        </div>
      </div>
    </div>
  );
}
