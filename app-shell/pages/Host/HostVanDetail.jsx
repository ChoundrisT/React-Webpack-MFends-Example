import React from "react";
import { useParams, Link, NavLink, Outlet, useLoaderData } from "react-router-dom";
import { getHostVans } from "../../api";
import { requireAuth } from "../../utils";
import { useLocation, useNavigate } from 'react-router-dom';

export async function loader({ params, request }) {
    await requireAuth(request);
    return getHostVans(params.id);
}

export default function HostVanDetail() {
    const currentVan = useLoaderData()[0];
    console.log("getVans in hostVans: ", currentVan);

    const navigate = useNavigate();

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <section>
            <button onClick={handleBack} className="back-button" style={{
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
                }}>

                    <span style={{ marginRight: '8px' }}>&larr;</span> 
                    <span>Back</span>

            </button>


            <div className="host-van-detail-layout-container">
                <div className="host-van-detail">
                    <img src={currentVan.imageUrl} alt={currentVan.name} />
                    <div className="host-van-detail-info-text">
                        <i className={`van-type van-type-${currentVan.type}`}>
                            {currentVan.type}
                        </i>
                        <h3>{currentVan.name}</h3>
                        <h4>${currentVan.price}/day</h4>
                    </div>
                </div>

                <nav className="host-van-detail-nav">
                    <NavLink
                        to="."
                        end
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >
                        Details
                    </NavLink>
                    <NavLink
                        to="pricing"
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >
                        Pricing
                    </NavLink>
                    <NavLink
                        to="photos"
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >
                        Photos
                    </NavLink>
                </nav>
                <Outlet context={{ currentVan }} />
            </div>
        </section>
    );
}
