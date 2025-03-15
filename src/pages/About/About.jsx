import "./index.scss";
import img1 from "./Images/7b85f8c1dcce81e71e2eb178be13bd4d.jpg";
export default function About() {
  return (
    <div className="cart-container" style={{ padding: "70px 0 70px 70px" }}>
      <p>
        Home / <b>About</b>
      </p>
      <div className="sectionStory d-flex align-items-center">
        <div className="story">
          <h1>Our Story</h1>
          <p>
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.
          </p>
          <p>
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
        <div className="story-image">
          <img src={img1} className=" " loading="lazy" />
        </div>
      </div>
    </div>
  );
}
