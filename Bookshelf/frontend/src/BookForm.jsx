import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/BookForm.css"; // Make sure to create this file for styling

const BookForm = ({ addBook }) => {
    const navigate = useNavigate();
    const [icon, setIcon] = useState("");
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState("");
    const [description, setDescription] = useState("");

    const handleSaveBook = () => {
        // Create the new book object
        const newBook = { 
            id: Date.now(), // Use a unique id like timestamp
            icon, 
            title, 
            authors, 
            description 
        };

        // Add the book to the list
        addBook(newBook);

        // Navigate back to the home page
        navigate("/");
    };

    return (
        <div className="book-creation-container">
            <h1>Create New Book</h1>
            <div className="form-group">
                <label>Icon</label>
                <input
                    type="text"
                    placeholder="Enter book icon URL"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    placeholder="Enter book title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Authors</label>
                <input
                    type="text"
                    placeholder="Enter authors"
                    value={authors}
                    onChange={(e) => setAuthors(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea
                    placeholder="Enter book description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button onClick={handleSaveBook}>Save Book</button>
        </div>
    );
};

export default BookForm;
