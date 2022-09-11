const { TwitterApi } = require("twitter-api-v2");
const express = require('express');
const app = express();
require("dotenv").config();

const PORT = 8000

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/views/resources'));

app.get("/", function(req, res) {
    res.render("main");
});

app.get('/vent', function (req, res) {
    const client = new TwitterApi({
        appKey: process.env.API_KEY,
        appSecret: process.env.API_KEY_SECRET,
        accessToken: process.env.ACCESS_TOKEN,
        accessSecret: process.env.ACCESS_TOKEN_SECRET
    });
    const readWriteClient = client.readWrite;

    const content = `${req.query.content}\n\n- Anonymous`

    if (req.query.content == "") {

    }

    if (res.statusCode == 200) {
        res.render("submitted", { content: req.query.content, serverLog: "Status Code: 200 - The tweet was successful :D" });
        readWriteClient.v2.tweet(content);
    } else {
        res.render("submitted", { content: req.query.content, serverLog: `Status Code: ${res.statusCode} - The tweet was not successful, Something went wrong ...` });
    }
});

app.listen(PORT, function() {
    console.log("Express server is listening to " + PORT);
});