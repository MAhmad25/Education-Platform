const express = require("express");
require("dotenv").config();
require("./config/db").connect();
require("./config/cloudinary").cloudinaryConfig();
const app = express();
const PORT = process.env.PORT;

// TODO: Require the Routes from route folder

app.use(express.json()); // ?Middleware for parsing body data
app.use("/api/v1"); //? First version API Routes
app.listen(PORT, () => console.log("Server started")); //! Server Listening
