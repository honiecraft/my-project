import { DateRange } from "react-date-range";
import { endOfDay, startOfDay } from "date-fns";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import "./booking.css";

import { SearchContext } from "../../context/SearchContext";
import { useEffect } from "react";

const Reserve = ({ setOpen, hotelId, dateConverter }) => {
  const navigate = useNavigate();
  const { dates } = useContext(SearchContext);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [roomBill, setRoomBill] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [roomList, setRoomList] = useState({ data: [], isLoading: false });
  const [userInfor, setUserInfor] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const token = JSON.parse(sessionStorage.getItem("token"));
  const tokenInfor = token ? token : null;

  const [sDates, setSDates] = useState([
    {
      startDate: dates ? new Date(dates[0].startDate) : new Date(),
      endDate: dates ? new Date(dates[0].endDate) : new Date(),
      key: "selection",
    },
  ]);

  const numOfDays = dateConverter(
    startOfDay(new Date(sDates[0].startDate)),
    endOfDay(new Date(sDates[0].endDate))
  );
  const totalBill = numOfDays * roomBill;

  // Fetch List of available room
  useEffect(() => {
    const getHotelRoom = async () => {
      setRoomList((prev) => ({
        ...prev,
        isLoading: true,
      }));

      try {
        const resTrans = await fetch(
          `http://localhost:5000/hotels/room/${hotelId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: tokenInfor ? `Bearer ${tokenInfor}` : ``,
            },
            body: JSON.stringify(sDates),
          }
        );
        const body = await resTrans.json();

        if (!resTrans.ok) {
          throw new Error(body.message);
        }

        setRoomList({
          data: body,
          isLoading: false,
        });
      } catch (err) {
        alert(err.message);
      }
    };
    getHotelRoom();
  }, [sDates]);

  // Create Transaction
  const postTransaction = async (data) => {
    try {
      const resTrans = await fetch(`http://localhost:5000/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: tokenInfor ? `Bearer ${tokenInfor}` : ``,
        },
        body: JSON.stringify(data),
      });
      const dataTrans = await resTrans.json();

      if (!resTrans.ok) {
        throw new Error(dataTrans.message);
      }
      return resTrans;
    } catch (err) {
      alert(err.message);
    }
  };

  // Update User Information
  const updateUserInfor = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/users/${userInfor._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenInfor ? `Bearer ${tokenInfor}` : ``,
          },
          body: JSON.stringify(userInfor),
        }
      );
      const updatedUser = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return true;
      } else throw new Error(updatedUser.message);
    } catch (err) {
      alert(err.message);
    }
  };

  // Handle Select Room
  const handleCheck = (e, roomNum, price) => {
    const value = e.target.value;
    const index = selectedRooms.map((item) => item.roomId).indexOf(value);
    if (index < 0) {
      selectedRooms.push({ roomId: value, no: roomNum });
      setRoomBill((prev) => prev + price);
    } else {
      selectedRooms.splice(index, 1);
      setRoomBill((prev) => prev - price);
    }
    setSelectedRooms([...selectedRooms]);
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfor((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Date Change
  const handleDateChange = (item) => {
    setSDates([item.selection]);
  };

  // Submit Booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBooking = {
      user: userInfor.username,
      hotel: hotelId,
      room: selectedRooms,
      dateStart: startOfDay(new Date(sDates[0].startDate)),
      dateEnd: endOfDay(new Date(sDates[0].endDate)),
      price: totalBill,
      payment: paymentMethod,
      status: "Booked",
    };

    try {
      const firstExec = await postTransaction(newBooking);
      const secondExec = firstExec?.ok && (await updateUserInfor());

      if (!secondExec) {
        throw new Error("Something wrong!");
      } else {
        setOpen(false);
        navigate(`/transactions/${userInfor._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="booking-container">
      <form>
        <div className="booking-info container">
          <div className="dates">
            <h1 className="title">Dates</h1>
            <DateRange
              editableDateInputs={true}
              onChange={(item) => handleDateChange(item)}
              moveRangeOnFirstSelection={false}
              ranges={sDates}
              className="dates-info"
              minDate={new Date()}
            />
          </div>
          <div className="info">
            <h1 className="title">Reserve Info</h1>
            <div className="info-item">
              <label>Your Full Name:</label>
              <div>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Full Name"
                  defaultValue={userInfor.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="info-item">
              <label>Your Email:</label>
              <div>
                <input
                  type="text"
                  name="email"
                  id="email"
                  defaultValue={userInfor.email}
                  placeholder="Email"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="info-item">
              <label>Your Phone Number:</label>
              <div>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  defaultValue={userInfor.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="info-item">
              <label>Your Identity Card Number:</label>
              <div>
                <input
                  type="text"
                  name="idCard"
                  id="idCard"
                  placeholder="Card Number"
                  defaultValue={userInfor.idCard}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <h1 className="title">Select Rooms</h1>
        <div className="select-room-container">
          {roomList.isLoading ? (
            <p>Loading...</p>
          ) : !roomList.data?.length > 0 ? (
            <p>No Room Found!</p>
          ) : (
            roomList.data.map((item) => {
              return (
                <div className="room-item" key={item._id}>
                  <div className="rItemInfo">
                    <div className="room-title">{item.title}</div>
                    <div className="room-desc">{item.desc}</div>
                    <div className="room-max">
                      Max people: <b>{item.maxPeople}</b>
                    </div>
                    <div className="room-price">${item.price}</div>
                  </div>
                  <div className="select-rooms">
                    {item.roomNumbers.map((room) => {
                      return (
                        <div className="room" key={room._id}>
                          <label>{room.number}</label>
                          <input
                            type="checkbox"
                            value={room._id}
                            onChange={(e) =>
                              handleCheck(e, room.number, item.price)
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
        <h1 className="title">
          Total Bill:{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(totalBill)}
        </h1>
        <div className="totel-bill container">
          <select
            className="select-payment"
            name="method"
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option hidden>Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
          </select>
          <button className="button" onClick={(e) => handleSubmit(e)}>
            Reserve Now!
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reserve;
