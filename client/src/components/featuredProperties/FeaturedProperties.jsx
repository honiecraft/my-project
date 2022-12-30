import { Link } from "react-router-dom";
import Loading from "../Loading";
import "./featuredProperties.css";

const FeaturedProperties = ({ hotelList }) => {
  if (!hotelList) {
    return <Loading />;
  } else
    return (
      <div className="fp">
        {hotelList.length > 0 ? (
          hotelList.map((h) => {
            return (
              <div className="fpItem" key={h._id}>
                <img src={h.photos[0]} alt="" className="fpImg" />
                <span className="fpName">
                  <Link to={`/hotels/${h._id}`}>{h.name}</Link>
                </span>
                <span className="fpCity">{h.city}</span>
                <span className="fpPrice">
                  Starting from ${h.cheapestPrice}
                </span>
              </div>
            );
          })
        ) : (
          <h1>Not Found!</h1>
        )}
      </div>
    );
};

export default FeaturedProperties;
