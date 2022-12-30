import "./list.css";
import Header from "../../components/header/Header";
import Loading from "../../components/Loading";
import { SearchContext } from "../../context/SearchContext";

import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);

  const query = {
    city: destination,
    dates: dates,
    options: options,
  };

  const { data, isLoading, fetchData } = useFetch(
    `${process.env.REACT_APP_SERVER_URL}/hotels/search`,
    "POST",
    query
  );
  const { dispatch } = useContext(SearchContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOptions((prev) => ({ ...prev, [name]: parseInt(value) }));
  };

  const handleClick = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    fetchData();
  };

  return (
    <div>
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                defaultValue={destination}
                type="text"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    name="minPrice"
                    type="number"
                    className="lsOptionInput"
                    onChange={(e) => handleChange(e)}
                    defaultValue={options.minPrice}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    name="maxPrice"
                    type="number"
                    className="lsOptionInput"
                    onChange={(e) => handleChange(e)}
                    defaultValue={options.maxPrice}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    name="adult"
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    defaultValue={options.adult}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    name="child"
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    defaultValue={options.child}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    name="room"
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    defaultValue={options.room}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {data[0] ? (
                  data.map((item) => {
                    return <SearchItem key={item._id} item={item} />;
                  })
                ) : (
                  <h1>No result Found!</h1>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
