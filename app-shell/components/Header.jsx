import React from "react"
import { Link, NavLink , useNavigate } from "react-router-dom"
import {default as avatar} from "../assets/images/avatar-icon.png"
import { redirect } from "react-router-dom"
import { useSelector , useDispatch } from "react-redux"; 
import { resetCart } from "../src/cartSlice";

export default function Header() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    const dispatch = useDispatch();
    const navigate = useNavigate()

    
    function fakeLogOut() {
        localStorage.removeItem("loggedin")
        dispatch(resetCart())
        navigate("/login?message=You must log in first.&redirectTo=/cart")
    }

    const cartItems = useSelector((state) => state.cart.items); 
    
    return (
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>
            <nav>
                <NavLink 
                    to="host"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Host
                </NavLink>
                <NavLink 
                    to="about"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    About
                </NavLink>
                <NavLink 
                    to="vans"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Vans
                </NavLink>
                <NavLink 
                    to="cart"
                    style={({isActive}) => isActive ? activeStyles : null}
                    className="position-relative"
                >
                    Cart
                    {cartItems.length >0 && 
                        <span className="position-absolute top-0 start-10 translate-middle badge rounded-pill bg-danger">
                        {cartItems.length}
                    </span>}
                </NavLink>
                <NavLink to="login" className="login-link">
                    <img 
                        src={avatar} 
                        className="login-icon"
                    />
                </NavLink>
                
                <button onClick={fakeLogOut}>sign out</button>
            </nav>
        </header>
    )
}