const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(cookieParser({}));
app.use("/test", (req, res) => {
    res.send("<h1>Selamat Datang Di Vehicle App by:Muhammad Riyansyah</h1>");
});

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "../.env",
    });
}

// Import routes
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRouter");
const vehicleRoute = require("./routes/vehicleRoute");

// Register routes
app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/vehicle", vehicleRoute);

// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
