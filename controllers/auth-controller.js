const express = require("express");
const router = express.Router();
const register = require("./register-controller");
const login = require("./login-controller");
const logout = require("./logout-controller");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
module.exports = router;