// BookItem.jsx
import React from "react";
import "./styles/BookItem.css"; // Optional for styling

const BookItem = ({ icon, title, authors }) => {
    return (
        <div className="book-item">
            <img src={icon} alt="Book Icon" className="book-icon" />
            <p className="book-title">{title}</p>
            <p className="authors">{authors}</p>
        </div>
    );
};

export default BookItem;
