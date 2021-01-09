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

app.get("/", async (req, res) => {
    const jobsResponse = await getOnlineJobs("https://servers.fivem.net/servers/detail/a45da3");
    res.send(generateView(jobsResponse));
});


app.listen(process.env.PORT, () => {
    console.log(`App is listening on port ${process.env.PORT}`);
});