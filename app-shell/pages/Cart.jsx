import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const vans = [
   {
      id: "1",
      name: "Modest Explorer",
      price: 60,
      description: "The Modest Explorer is a van designed to get you out of the house and into nature...",
      type: "simple",
      hostId: "123",
      imageUrl: "https://assets.scrimba.com/advanced-react/react-router/modest-explorer.png"
   },
]

function getDaysBetween(start, end) {
   const msPerDay = 1000 * 60 * 60 * 24
   return Math.ceil((end - start) / msPerDay)
}

export default function Cart() {
    const [van] = useState(() => vans[Math.floor(Math.random() * vans.length)])
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [daysBooked, setDaysBooked] = useState(0)
 
    useEffect(() => {
       if (startDate && endDate) {
          const start = new Date(startDate)
          const end = new Date(endDate)
          const days = getDaysBetween(start, end)
          setDaysBooked(days > 0 ? days : 0)
       } else {
          setDaysBooked(0)
       }
    }, [startDate, endDate])
 
    const total = daysBooked * van.price
 
    return (
       <div className="cart-page" style={{ padding: "30px 26px" }}>
          <h1 style={{ fontSize: "2rem", color: "#161616", marginBottom: "20px" }}>Your Cart</h1>
 
          <div style={{
             backgroundColor: "white",
             borderRadius: "6px",
             padding: "20px",
             boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.05)",
             marginBottom: "20px",
             display: "flex", // Flexbox to align image on the left and content on the right
             alignItems: "center" // Centering content vertically
          }}>
             <img
                src={van.imageUrl}
                alt={van.name}
                style={{
                   width: "auto", 
                   height: "390px", // Set height of the image to 390px
                   marginRight: "20px" // Space between image and content
                }}
             />
             
             <div>
                <p style={{ color: "#4D4D4D", marginBottom: "12px" }}>
                   You have the <strong>{van.name}</strong> van in your cart.
                </p>
 
                <div style={{ marginBottom: "12px" }}>
                   <label style={{ display: "block", marginBottom: "6px" }}>Select Start Date:</label>
                   <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      style={{ padding: "6px", borderRadius: "4px", border: "1px solid #ccc" }}
                   />
                </div>
 
                <div style={{ marginBottom: "12px" }}>
                   <label style={{ display: "block", marginBottom: "6px" }}>Select End Date:</label>
                   <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      style={{ padding: "6px", borderRadius: "4px", border: "1px solid #ccc" }}
                   />
                </div>
 
                {daysBooked > 0 && (
                   <>
                      <p style={{ color: "#4D4D4D" }}>
                         <strong>Price per day:</strong> ${van.price}
                      </p>
                      <p style={{ fontWeight: "bold", marginTop: "8px" }}>
                         Total: ${total} for {daysBooked} {daysBooked === 1 ? "day" : "days"}
                      </p>
                   </>
                )}
 
                {startDate && endDate && daysBooked === 0 && (
                   <p style={{ color: "red", marginTop: "10px" }}>End date must be after start date.</p>
                )}
                {startDate && endDate && daysBooked > 0 && (
                <button  className="link-button" style={{
                   backgroundColor: "#FF8C38",
                   color: "white",
                   borderRadius: "5px",
                   padding: "10px 16px",
                   textDecoration: "none"
                }}>
                   Book Van
                </button>
             )}
             </div>
          </div>
       </div>
    )
 }
 