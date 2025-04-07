import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookInfo = () => {
    const navigate = useNavigate();  // For redirecting to login

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        } else { //placeholder until future implementation is developed
            navigate("/home")
        }
    }, [navigate]);
};

export default BookInfo;
