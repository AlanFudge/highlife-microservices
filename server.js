require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const noCache = require("nocache");

const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(noCache());


const getOnlineJobs = require("./utilities/getOnlineJobs.js");
const generateView = require("./utilities/generateView.js");

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.get("/api/:serverId", async (req, res) => {
    const jobsResponse = await getOnlineJobs("https://servers.fivem.net/servers/detail/" + req.params.serverId);
    res.json(jobsResponse);
});

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/apps/view-online-jobs-widget/build/index.html");
});

app.use("/", express.static(process.cwd() + "/apps/view-online-jobs-widget/build"));


app.listen(process.env.PORT, () => {
    console.log(`App is listening on port ${process.env.PORT}`);
});