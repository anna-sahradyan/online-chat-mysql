const express = require("express");
const app = express();
const db = require("./db.config");
const cookie = require("cookie-parser");
const PORT = process.env.PORT || 8080;
const cors= require("cors");

//?MIDDLEWARE
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(cookie());
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/', require('./routes/pages-route'));
// app.use('/auth', require('./routes/auth'));
db.connect((err) => {
    if (err) throw err;
    console.log("database connected")
})


app.listen(PORT, () => {
    console.log(`server is running in http://localhost:${PORT}`);
})