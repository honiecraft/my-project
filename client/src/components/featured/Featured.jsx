import "./featured.css";

const imgArr = [
  {
    id: "Ha Noi",
    img: "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/27/69/4b.jpg",
  },
  {
    id: "Ho Chi Minh",
    img: "https://globalnews.lockton.com/wp-content/uploads/2020/02/Vietnam1-1024x683.jpg",
  },
  {
    id: "Da Nang",
    img: "https://parisdelihotel.com/uploads/images/180130110136.jpg",
  },
];

const Featured = ({ hotelList }) => {
  // Map Hotel list by City with image
  const result = hotelList?.map((h) => ({
    ...h,
    img: imgArr.filter((img) => img.id === h.city)[0].img,
  }));

  return (
    <div className="featured">
      {result?.length > 0 ? (
        result?.map((h) => {
          return (
            <div className="featuredItem" key={h.city}>
              <img src={h.img} alt="" className="featuredImg" />
              <div className="featuredTitles">
                <h1>{h.city}</h1>
                <h2>{h.count} properties</h2>
              </div>
            </div>
          );
        })
      ) : (
        <h1>Not Found!</h1>
      )}
    </div>
  );
};

export default Featured;
