const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const videoRoutes = require("./routes/video");

//Middleware
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.use("/videos", videoRoutes);

app.get("/", (_req, res)=> {
    res.send("Welcome to the server");
});

app.listen(PORT, ()=> {
    console.log(`Express server is running at ${PORT}`);
})