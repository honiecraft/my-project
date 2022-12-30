import Loading from "../Loading";
import "./propertyList.css";

const imgArr = [
  {
    id: "Hotel",
    img: "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
  },
  {
    id: "Apartments",
    img: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
  },
  {
    id: "Resorts",
    img: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
  },
  {
    id: "Villas",
    img: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
  },
  {
    id: "Cabins",
    img: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  },
];

const PropertyList = ({ hotelList }) => {
  // Map Hotel list by Type with image
  const result = hotelList.map((h) => ({
    ...h,
    img: imgArr.filter((img) => img.id === h.type)[0].img,
  }));
  if (!result) {
    return <Loading />;
  } else
    return (
      <div className="pList">
        {result.length > 0 ? (
          result.map((h) => {
            return (
              <div className="pListItem" key={h.type}>
                <img src={h.img} alt="" className="pListImg" />
                <div className="pListTitles">
                  <h1>{h.type}</h1>
                  <h2>
                    {h.count} {h.type.toLowerCase()}
                  </h2>
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

export default PropertyList;
