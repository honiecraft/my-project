import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./hotelForm.css";

import { hotelInputs } from "../../template/formSource";
import useFetch from "../../hooks/useFetch";

const HotelForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedHotelId = location.pathname.split("/")[2];
  const isEditing = selectedHotelId !== "new";
  const token = JSON.parse(sessionStorage.getItem("token"));
  const tokenInfor = token ? token : null;

  const [info, setInfo] = useState({});
  const { data } = useFetch(
    `${process.env.REACT_APP_SERVER_URL}/hotels${
      isEditing ? `/${selectedHotelId}` : ""
    }`,
    null,
    null
  );

  const roomList = useFetch(
    `${process.env.REACT_APP_SERVER_URL}/rooms`,
    null,
    null
  );

  const [rooms, setRooms] = useState(data ? data["rooms"] : []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInfo((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "photos" && { photos: value.split(",").map((img) => img) }),
    }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const newHotel = {
      ...info,
      rooms,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/hotels${
          isEditing ? `/${selectedHotelId}` : ""
        }`,
        {
          method: isEditing ? "PUT" : "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenInfor ? `Bearer ${tokenInfor}` : ``,
          },
          body: JSON.stringify(newHotel),
        }
      );

      const body = await response.json();
      if (!response.ok) {
        throw new Error(body.message);
      } else navigate("/hotels");
    } catch (err) {
      window.alert(err);
      console.log(err);
    }
  };

  return (
    <div className="newContainer">
      <div className="formTitle">
        <h1>{isEditing ? `Update Hotel` : `Add New Hotel`} </h1>
      </div>
      <div className="hotelForm">
        <form>
          {/* Input */}
          {hotelInputs.map((input) => (
            <div className="formInput" key={input.id}>
              <label>{input.label}</label>
              <input
                name={input.name}
                id={input.id}
                defaultValue={data ? data[input.name] : null}
                onChange={handleChange}
                onBlur={handleChange}
                type={input.type}
                placeholder={input.placeholder}
                required
              />
            </div>
          ))}
          {/* Text area */}
          <div className="formInput">
            <label>Images</label>
            <textarea
              name="photos"
              id="photos"
              defaultValue={data ? data["photos"] : ""}
              onChange={handleChange}
            ></textarea>
          </div>
          {/* Select field */}
          <div className="formInput">
            <label>Featured</label>
            <div>
              <select
                id="featured"
                name="featured"
                defaultValue={data ? data["photos"] : "false"}
                onChange={handleChange}
                required
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
          </div>
          {/* Select Rooms */}
          <div className="selectRooms">
            <label>Rooms</label>
            <select id="rooms" name="rooms" multiple onChange={handleSelect}>
              {roomList.isLoading
                ? "loading"
                : roomList.data &&
                  roomList.data.map((room) => {
                    const isSelectedRoom =
                      data["rooms"]?.indexOf(room._id) !== -1;

                    return (
                      <option
                        key={room._id}
                        value={room._id}
                        id={room._id}
                        selected={isEditing ? isSelectedRoom : false}
                      >
                        {room.title}
                      </option>
                    );
                  })}
            </select>
          </div>
          <button className="hotelFormBtn" onClick={handleClick}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default HotelForm;
