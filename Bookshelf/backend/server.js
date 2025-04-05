const express = require("express");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");
const app = express();

const pool = new Pool({
    user: "villerauta",
    host: "localhost",
    database: "bookshelf_users",
    password: "testi123",
    port: 5432,
});

app.use(express.json()); // To parse JSON body

// Register endpoint
app.post("/api/register", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        const result = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
            [email, hashedPassword]
        );

        // Respond with success message
        res.status(201).json({
            message: "User registered successfully.",
            user: result.rows[0], // Return the created user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong." });
    }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
