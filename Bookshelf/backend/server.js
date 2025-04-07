const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
const app = express();

const jwtSecretKey = process.env.JWT_SECRET_KEY;

const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
});
pool.on("error", (err) => { console.error("Unexpected database error:", err); process.exit(-1); });

app.use(cors());
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
        res.status(500).json({ message: "Something went wrong on the server." });    }
});

//login endpoint
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        // Fetch user from the database
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials. No user found." });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials. Wrong password." });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, jwtSecretKey, { expiresIn: "1h" });

        // Respond with success message and token
        res.json({
            message: "Login successful.",
            token,
            user: { id: user.id, email: user.email },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong." });
    }
});

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1]; // Extract token after "Bearer"

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    try {
        const verified = jwt.verify(token, jwtSecretKey);
        req.user = verified;
        next(); // Proceed to the protected route
    } catch (error) {
        return res.sendStatus(401); // Invalid token
    }
};

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
