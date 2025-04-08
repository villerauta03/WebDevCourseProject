// BookItem.jsx
import React from "react";
import "./BookItem.css"; // Optional for styling

const BookItem = ({ icon, title }) => {
    return (
        <div className="book-item">
            <img src={icon} alt="Book Icon" className="book-icon" />
            <p className="book-title">{title}</p>
        </div>
    );
};

export default BookItem;
