import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookItem from "./BookItem"; // Import the BookItem component
import "./Home.css";

const HomePage = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [books, setBooks] = useState([]); // Array to store books

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
    };

    const addBook = () => {
        const newBook = {
            id: books.length + 1,
            icon: "path/to/default-book-icon.jpg", // Placeholder icon
            title: `Book ${books.length + 1}`, // Example title
        };
        setBooks([...books, newBook]); // Add the new book to the list
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("username");

        if (!token) {
            navigate("/login");
            return;
        } else {
            setUserEmail(email);
        }
    }, [navigate]);

    return (
        <div>
            {/* Top Section */}
            <div className="top-section">
                <header className="header">
                    <button className="create-button" onClick={addBook}>
                        Luo
                    </button>
                    <button className="settings-button">Asetukset</button>
                </header>
                <div className="search-bar">
                    <input type="text" className="search-input" placeholder="Hae..." />
                    <select className="sort-dropdown">
                        <option value="">Sort by...</option>
                        <option value="name">Name</option>
                        <option value="date">Date</option>
                    </select>
                </div>
            </div>

            {/* Gray Box */}
            <div className="gray-box">
                <main className="content">
                    {books.map((book) => (
                        <BookItem key={book.id} icon={book.icon} title={book.title} />
                    ))}
                </main>
            </div>
        </div>
    );
};

export default HomePage;
