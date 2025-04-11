import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookItem from "./BookItem"; // Import the BookItem component
import "./styles/Home.css";

const HomePage = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [books, setBooks] = useState([]); // Array to store books
    const [loading, setLoading] = useState(true);
    

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
    };

    const goSettings = () => {
        navigate("/settings");
    }

    const goBookForm = () => {
        navigate("/new-book");
    }

    const addBook = () => {
        const newBook = {
            id: books.length + 1,
            icon: "horse.png", // Placeholder icon
            title: `Book ${books.length + 1}`, // Example title.
            authors: "author1", // Example authors
        };
        setBooks([...books, newBook]); // Add the new book to the list
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userEmail = localStorage.getItem("username");

        if (!token) {
            navigate("/login");
            return;
        } else {
            setUserEmail(userEmail);
            setLoading(false);
        }

    }, [navigate]);

    return (
        <div>
            {/* Top Section */}
            <div className="top-section">
                <div className="left-side">
                    <button className="create-button" onClick={goBookForm}>
                        Luo
                    </button>
                </div>
                <div className="right-side">
                    <div className="top-row">
                        <button className="settings-button" onClick={goSettings}>Asetukset</button>
                        <span className="separator">|</span>
                        <button className="settings-button" onClick={handleLogout}>
                            Kirjaudu ulos
                        </button>
                    </div>
                    <div className="bottom-row">
                        <div className="search-bar">
                            <select className="sort-dropdown">
                                <option value="">Sort by...</option>
                                <option value="name">Name</option>
                                <option value="date">Date</option>
                            </select>
                            <input type="text" className="search-input" placeholder="Hae..." />
                        </div>
                    </div>
                </div>
            </div>

            {/* Gray Box */}
            <div className="gray-box">
                <main className="content">
                    {books.map((book) => (
                        <BookItem key={book.id} icon={book.icon} title={book.title} authors={book.authors} />
                    ))}
                </main>
            </div>
        </div>
    );
};

export default HomePage;
