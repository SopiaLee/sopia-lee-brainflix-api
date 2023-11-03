const express = require("express");
const router = express.Router();
const fs = require("fs");
const {v4: uuid} = require ("uuid");
const videosJson = require("../data/videos.json");


// Get all video data
router.get("/", (_req, res)=> {
    res.send(videosJson);
});

// Get one video using req.params
router.get("/:id", (req, res)=> {
    const {id} = req.params;
    
    const selectVideo = videosJson.find((video) => video.id === id);
    if(selectVideo) {
        res.send(selectVideo);
    } else {
        res.status(400).send("Incorrect video content");
    }
    });

// upload new video 
router.post("/", (req, res)=> {

    console.log("req.body:",req.body);

    const {title, description} = req.body;

    const newVideo = { 
    "id": uuid(),
    "title": title,
    "channel": "Sopia",
    "image": `${process.env.REACT_APP_API_URL}/images/uploadimage.jpg`,
    "description": description,
    "views": "0",
    "likes": "0",
    "duration": "4:01",
    "video": "https://project-2-api.herokuapp.com/stream",
    "timestamp": Date.now(),
    "comments": [] };
    
    videosJson.push(newVideo);

    const videoString = JSON.stringify(videosJson);
    fs.writeFileSync("./data/videos.json", videoString);
    res.send("video uploaded");
});

module.exports = router;