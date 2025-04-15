import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../src/cartSlice";

export default function Cart() {
   const cartItems = useSelector((state) => state.cart.items);
   const dispatch = useDispatch();

   const [bookingDates, setBookingDates] = useState({});

   const handleDateChange = (id, field, value) => {
      setBookingDates((prev) => ({
         ...prev,
         [id]: {
            ...prev[id],
            [field]: value
         }
      }));
   };

   const getDaysBetween = (startDate, endDate) => {
      if (!startDate || !endDate) return 0;
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end - start;
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return days > 0 ? days : 0;
   };

   return (
      <div className="cart-page" style={{ padding: "30px 26px" }}>
         <h1 style={{ textAlign: "center", fontSize: "2rem", color: "#161616", marginBottom: "20px" }}>
            Your Cart
         </h1>

         {cartItems.length === 0 ? (
            <p style={{ textAlign: "center" }}>Your cart is empty.</p>
         ) : (
            cartItems.map((item) => {
               const dates = bookingDates[item.id] || {};
               const daysBooked = getDaysBetween(dates.startDate, dates.endDate) || 0;
               const total = item.price * daysBooked;

               return (
                  <div
                  className=""
                     key={item.id}
                     style={{
                        width: '100%',
                        backgroundColor: "white",
                        borderRadius: "6px",
                        padding: "20px",
                        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.05)",
                        marginBottom: "20px",
                        display: "flex",
                        alignItems: "center",
                     }}
                  >
                     <img
                        src={item.imageUrl}
                        alt={item.name}
                        style={{ width: "auto", height: "390px", marginRight: "20px" }}
                     />
                     <div>
                        <p style={{ color: "#4D4D4D", marginBottom: "12px" }}>
                           You have the <strong>{item.name}</strong> van in your cart.
                        </p>
                        <p style={{ marginBottom: "12px" }}>
                           <strong>Price per day:</strong> ${item.price}
                        </p>
                        <form id="form">
                           <label htmlFor={`date-from-${item.id}`}>Dates of renting</label><br />
                           <input
                              type="date"
                              id={`date-from-${item.id}`}
                              name="date-from"
                              value={dates.startDate || ""}
                              onChange={(e) =>
                                 handleDateChange(item.id, "startDate", e.target.value)
                              }
                           />
                           <input
                              type="date"
                              id={`date-to-${item.id}`}
                              name="date-to"
                              value={dates.endDate || ""}
                              onChange={(e) =>
                                 handleDateChange(item.id, "endDate", e.target.value)
                              }
                           />
                        </form>

                        {total != 0 && <p style={{ fontWeight: "bold", marginTop: "8px" }}>
                           Total: ${total} for {daysBooked} day(s)
                        </p>}
                        <div className="d-flex justify-content-between">
                            {console.log("Days booeked: ",daysBooked)}
                            <button
                            disabled ={daysBooked===0}
                            style={{
                                backgroundColor: daysBooked ===0 ? "rgb(160, 160, 160)": "#73e73d",
                                color: "white",
                                border: "none",
                                padding: "10px 20px",
                                fontSize: "16px",
                                cursor:  daysBooked ===0 ? "not-allowed" :"pointer",
                                borderRadius: "5px",
                                transition: "background-color 0.3s ease"
                            }}
                            onMouseOver={(e) => daysBooked !== 0 ? e.target.style.backgroundColor = "#469720" : null}
                            onMouseOut={(e) => daysBooked !== 0 ? e.target.style.backgroundColor = "#73e73d" : null}
                            >
                            Book Van
                            </button>
                            <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            style={{
                                backgroundColor: "#c90909",
                                color: "white",
                                border: "none",
                                padding: "10px 20px",
                                fontSize: "16px",
                                cursor: "pointer",
                                borderRadius: "5px",
                                transition: "background-color 0.3s ease"
                            }}
                            onMouseOver={(e) => (e.target.style.backgroundColor = "#860606")}
                            onMouseOut={(e) => (e.target.style.backgroundColor = "#c90909")}
                            >
                            Remove Van
                            </button>
                        </div>
                     </div>
                  </div>
               );
            })
         )}
      </div>
   );
}
