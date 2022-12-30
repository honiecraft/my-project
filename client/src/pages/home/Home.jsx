import "./home.css";

import Loading from "../../components/Loading";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Header from "../../components/header/Header";
import PropertyList from "../../components/propertyList/PropertyList";

import useFetch from "../../hooks/useFetch";

const Home = () => {
  const homePageFields = {
    cities: ["Ha Noi", "Ho Chi Minh", "Da Nang"],
    types: ["Hotel", "Apartments", "Resorts", "Villas", "Cabins"],
    limit: 3,
  };

  const { data, isLoading } = useFetch(
    "http://localhost:5000/hotels/hotelsbyfields",
    "POST",
    homePageFields
  );

  return (
    <div>
      <Header />
      <div className="homeContainer">
        {!isLoading ? <Featured hotelList={data.hotelByCity} /> : <Loading />}
        <h1 className="homeTitle">Browse by property type</h1>
        {!isLoading ? (
          <PropertyList hotelList={data.hotelByType} />
        ) : (
          <Loading />
        )}
        <h1 className="homeTitle">Homes guests love</h1>
        {!isLoading ? (
          <FeaturedProperties hotelList={data.hotelByRating} />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};
export default Home;
