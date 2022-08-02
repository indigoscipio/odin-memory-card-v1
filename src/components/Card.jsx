import React from "react";

function Card({ item, onClick }) {
  return (
    <div className="card" onClick={(e, id) => onClick(e, item.id)}>
      <span className="card__emoji">{item.emoji}</span>
      <h1 className="card__title">{item.title}</h1>
      {/* <h3>Item ID: {item.id}</h3>
      <h3>isClicked: {item.isClicked ? "true" : "false"}</h3> */}
    </div>
  );
}

export default Card;
