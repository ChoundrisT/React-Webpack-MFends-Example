import React from "react"
import { Link, useParams, useLocation, useLoaderData } from "react-router-dom"
import { getVans } from "../../api"

export function loader({ params }) {
    return getVans(params.id)
}

export default function VanDetail() {
    const location = useLocation()
    const van = useLoaderData()

    const search = location.state?.search || "";
    const type = location.state?.type || "all";

    return (
        <div className="van-detail-container" >
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
                style={{
                    width:"200px",
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
                <img src={van.imageUrl} />
                <i className={`van-type ${van.type} selected`}>
                    {van.type}
                </i>
                <h2>{van.name}</h2>
                <p className="van-price"><span>${van.price}</span>/day</p>
                <p>{van.description}</p>
                <button className="link-button">Rent this van</button>
            </div>

        </div>
    )
}