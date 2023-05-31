import React from "react";
import Details from "./Details";
function Card(props) {
    return (
        <div>

            <div className="card">

                <div className="top">
                    <p>{props.id}</p>
                    <h2 className="name">{props.name}</h2>
                    <img
                        src={props.imgURL}
                        alt="avatar_img" className="circle-img"
                    />
                </div>
                <Details phone={props.phone} email={props.email} ></Details>

            </div>
        </div>
    );
}
export default Card;