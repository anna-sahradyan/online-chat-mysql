const express = require("express");
const app = express();
const db = require("./routes/db.config");
const cookie = require("cookie-parser");
const PORT = process.env.PORT || 5000;

//?MIDDLEWARE
app.use("/js", express.static(__dirname + "./public/js"));
app.use("/js", express.static(__dirname + "./public/css"));
app.set("views engine", "ejs");
app.set("views", "./views");
app.use(cookie());
app.use(express.json());
app.use(express.urlencoded());
db.connect((err) => {
    if (err) throw err;
    console.log("database connected")
})


app.listen(PORT, () => {
    console.log(`server is running in http://localhost:${PORT}`);
})

