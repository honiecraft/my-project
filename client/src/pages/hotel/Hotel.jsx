import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";

import "./hotel.css";

import Header from "../../components/header/Header";
import Booking from "../../components/booking/booking";
import Loading from "../../components/Loading";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Hotel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hotelId = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openBooking, setOpenBooking] = useState(false);

  // Fetch Infor Hotel
  const { data, isLoading } = useFetch(
    `http://localhost:5000/hotels/${hotelId}`,
    null,
    null
  );

  // Calculate Diff date
  const { dates, options } = useContext(SearchContext);
  const dateConverter = (startDate, endDate) => {
    const one_day = 1000 * 60 * 60 * 24;
    const diff = Math.ceil(
      Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime()) /
        one_day
    );
    return diff;
  };

  const days = dates ? dateConverter(dates[0].startDate, dates[0].endDate) : 1;

  // Toggle Image Slide
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  // Move Image Slide
  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  // Reserve Rom
  const { user } = useContext(AuthContext);
  const handleClick = () => {
    if (user) {
      setOpenBooking(true);
    } else navigate("/login");
  };

  return (
    <div>
      <Header type="list" />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow" onClick={handleClick}>
              Reserve or Book Now!
            </button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days ? days : 1}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    }).format(
                      days ? days : 1 * data.cheapestPrice * (options.room || 1)
                    )}
                  </b>{" "}
                  ({days ? days : 1} nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
            {openBooking && (
              <Booking
                setOpen={setOpenBooking}
                hotelId={hotelId}
                dateConverter={dateConverter}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotel;
