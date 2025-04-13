/**
 * BookItem.jsx
 * Tää on noille kirjojen ikoneille objekti joka näkyy Home.jsx sivulla harmaassa laatikossa
 * kun näistä klikkaa yhtään nii pitäis menna kyseisen kirjan BookInfo sivulle.
 */

import React from "react";
import { useNavigate } from 'react-router-dom';
import "./styles/BookItem.css"; //oikeen oma tyyli tälle

const BookItem = ({ id, icon, title, authors }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/book/${id}`);
    };

    return (
        <div className="book-item" onClick={handleClick}>
            {icon ? (
                <img src={icon} 
                alt={title} 
                className="book-icon" />
            ) : (
                <img
                    src="stockphotoman.jpg"
                    alt="Paikkamerkki"
                    className="book-icon"
                />
            )}
            <p className="book-title">{title}</p>
            <p className="authors">{authors}</p>
        </div>
    );
};

export default BookItem;
