import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./roomForm.css";

import { roomInputs } from "../../template/formSource";
import useFetch from "../../hooks/useFetch";

const RoomForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedRoomlId = location.pathname.split("/")[2];
  const isEditing = selectedRoomlId !== "new";
  const [roomInfor, setRoomInfor] = useState({});
  const [hotelId, setHotelId] = useState("");

  const token = JSON.parse(sessionStorage.getItem("token"));
  const tokenInfor = token ? token : null;

  const { data, isLoading } = useFetch(
    `http://localhost:5000/rooms${isEditing && `/${selectedRoomlId}`}`,
    null,
    null
  );
  const hotelList = useFetch(`http://localhost:5000/hotels`, null, null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRoomInfor((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "roomNumbers" && {
        roomNumbers: value.split(",").map((room) => ({ number: room })),
      }),
    }));
  };
  const roomNo = data.roomNumbers?.map((r) => r.number);

  const handleClick = async (e) => {
    e.preventDefault();
    if (!isEditing && !hotelId) {
      alert("Please select Hotel!");
    } else
      try {
        const response = await fetch(
          `http://localhost:5000/rooms/${
            isEditing ? selectedRoomlId : hotelId
          }`,
          {
            method: isEditing ? "PUT" : "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: tokenInfor ? `Bearer ${tokenInfor}` : ``,
            },
            body: JSON.stringify(roomInfor),
          }
        );

        const body = await response.json();
        if (!response.ok) {
          throw new Error(body.message);
        } else navigate("/rooms");
      } catch (err) {
        alert(err);
        console.log(err);
      }
  };

  return (
    <div className="newContainer">
      <div className="formTitle">
        <h1>{isEditing ? `Update Room` : `Add New Room`}</h1>
      </div>
      <div className="roomForm">
        <form>
          {/* Input */}
          {roomInputs.map((input) => (
            <div className="formInput" key={input.id}>
              <label>{input.label}</label>
              <input
                id={input.id}
                defaultValue={data ? data[input.name] : ""}
                name={input.name}
                onChange={handleChange}
                onBlur={handleChange}
                type={input.type}
                placeholder={input.placeholder}
                required
              />
            </div>
          ))}
          {/* Select Room */}
          <div className="formBottom">
            <div className="formInput">
              <label>Rooms</label>
              <div>
                <textarea
                  name="roomNumbers"
                  defaultValue={data ? roomNo : ""}
                  id="roomNumbers"
                  onChange={handleChange}
                  onBlur={handleChange}
                  placeholder="give comma between room numbers."
                ></textarea>
              </div>
            </div>
            {/* Select Hotel */}
            <div className="formInput">
              <label>Choose a hotel</label>
              <div>
                <select
                  className="selectHotel"
                  name="hotelId"
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                  defaultValue=""
                >
                  <option hidden value="">
                    -- Select One --
                  </option>

                  {isLoading
                    ? "loading"
                    : hotelList.data &&
                      hotelList.data.map((hotel) => {
                        return (
                          <option key={hotel._id} value={hotel._id}>
                            {hotel.name}
                          </option>
                        );
                      })}
                </select>
              </div>
            </div>
            <button className="roomFormBtn" onClick={handleClick}>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomForm;
