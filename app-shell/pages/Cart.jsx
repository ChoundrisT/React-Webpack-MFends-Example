import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to access the Redux store

// Sample van data (this could be part of your state or API)
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
];

function getDaysBetween(start, end) {
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.ceil((end - start) / msPerDay);
}

export default function Cart() {
    // Get the cart items from Redux store
    const cartItems = useSelector((state) => state.cart.items); 

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [daysBooked, setDaysBooked] = useState(0);

    useEffect(() => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const days = getDaysBetween(start, end);
            setDaysBooked(days > 0 ? days : 0);
        } else {
            setDaysBooked(0);
        }
    }, [startDate, endDate]);

   //  // Calculate total price for all items in the cart
   //  const total = cartItems.reduce((acc, item) => {
   //      const daysBooked = item.daysBooked || 0;
   //      return acc + (item.price * daysBooked);
   //  }, 0);

    return (
        <div className="cart-page" style={{ padding: "30px 26px" }}>
            <h1 style={{ fontSize: "2rem", color: "#161616", marginBottom: "20px" }}>Your Cart</h1>

            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cartItems.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            backgroundColor: "white",
                            borderRadius: "6px",
                            padding: "20px",
                            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.05)",
                            marginBottom: "20px",
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <img
                            src={item.imageUrl}
                            alt={item.name}
                            style={{
                                width: "auto", 
                                height: "390px",
                                marginRight: "20px"
                            }}
                        />
                        <div>
                            <p style={{ color: "#4D4D4D", marginBottom: "12px" }}>
                                You have the <strong>{item.name}</strong> van in your cart.
                            </p>
                            <p style={{ marginBottom: "12px" }}>
                                <strong>Price per day:</strong> ${item.price}
                            </p>
                            <p style={{ marginBottom: "12px" }}>
                                <strong>Quantity:</strong> {item.quantity || 1}
                            </p>
                            <p style={{ fontWeight: "bold", marginTop: "8px" }}>
                                Total: ${item.price * (item.quantity || 1)} for {item.quantity || 1} day(s)
                            </p>
                        </div>
                    </div>
                ))
            )}

            {cartItems.length > 0 && (
                <>
                    {/* <h3>Total Price: ${total}</h3> */}
                    {/* <Link
                        to="/checkout"
                        style={{
                            backgroundColor: "#FF8C38",
                            color: "white",
                            borderRadius: "5px",
                            padding: "10px 16px",
                            textDecoration: "none",
                            textAlign: "center"
                        }}
                    >
                        Proceed to Checkout
                    </Link> */}
                </>
            )}
        </div>
    );
}
