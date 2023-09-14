const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const db = require('../db.config');
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
};
const registerUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        // Check for empty email and password
        if (!email || !password) {
            return res.status(400).json({message: 'Email and password are required'});
        }
        // Check for valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({message: 'Invalid email format'});
        }

        // Check password length
        if (password.length < 8) {
            return res.status(400).json({message: 'Password must be at least 8 characters long'});
        }
        const existingUser = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({message: 'Email is already registered'});
        }

        // Hash the password using bcryptjs
        const hashedPassword = await bcrypt.hash(password, 8);
        // Insert the user into the database
        await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

        // Respond with a success message
        res.status(201).json({message: 'Registration successful'});
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};
//?SIGN IN
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: "error", error: "Please add email and password" });
        } else {
            db.query("SELECT id, email, password FROM users WHERE email=?", [email], async (Err, result) => {
                if (!result[0]) {
                    return res.json({ status: "error", error: "Incorrect Email or password" });
                } else {
                    const isPasswordValid = await bcrypt.compare(password, result[0].password);
                    if (!isPasswordValid) {
                        return res.json({ status: "error", error: "Incorrect Email or password" });
                    }

                    const token = generateToken({ id: result[0].id })

                    const cookieOptions = {
                        expiresIn: new Date(Date.now() + 1000 * 86400),
                        httpOnly: true,
                    };

                    res.cookie("userRegistered", token, cookieOptions);
                    return res.json({ status: "success", success: "User has been logged In" });
                }
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
};

module.exports = {
    registerUser,
    loginUser
};

