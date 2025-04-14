// src/components/VanDetail.js
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../src/cartSlice";  // Import the addToCart action
import { useLoaderData } from "react-router-dom";
import { getVans } from "../../api";

export function loader({ params }) {
    return getVans(params.id);
}

export default function VanDetail() {
    const location = useLocation();
    const van = useLoaderData();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const search = location.state?.search || "";
    const type = location.state?.type || "all";

    const isLoggedIn = localStorage.getItem("loggedin");

    const handleAddToCart = () => {
        if (isLoggedIn) {
            console.log("Add to cart clicked");
            dispatch(addToCart(van));  
            navigate(`/cart`)
        } else {
            navigate('/login')
        }
    };

    return (
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
                style={{
                    width: "200px",
                    backgroundColor: 'rgb(255, 142, 122)',
                    color: 'rgb(0,0,0)', 
                    border: 'none',
                    borderRadius: '5px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                }}
            >
                &larr; <span>Back to {type} vans</span>
            </Link>

            <div className="van-detail">
                <img src={van.imageUrl} style={{ height: "300px", width: "auto", objectFit: "contain" }} />
                <i className={`van-type ${van.type} selected`}>
                    {van.type}
                </i>
                <h2>{van.name}</h2>
                <p className="van-price"><span>${van.price}</span>/day</p>
                <p>{van.description}</p>

                {/* Use a button for the Add to Cart action */}
                <button
                    onClick={handleAddToCart}
                    style={{
                        backgroundColor: '#FF8E7A',
                        color: '#000',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        display: 'inline-block',
                        fontSize: '16px',
                        cursor: 'pointer',
                    }}
                >
                    Rent this van
                </button>
            </div>
        </div>
    );
}
