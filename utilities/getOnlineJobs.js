require('dotenv').config({ path: "../.env" })
const puppeteer = require('puppeteer')

const isDevelopment = process.env.NODE_ENV !== "development";

const getOnlineJobs = async (url) => {
    const response = {}

    const browser = await puppeteer.launch({ headless: isDevelopment, args: ["--no-sandbox"] });
    const page = await browser.newPage();

    try {
        await page.goto(url);
        await page.waitForXPath(`//li[contains(., "hl_onlinejobs")]/span[contains(., "{")]`, { visible: true, timeout: 5000 });
        const onlineJobs = (await page.$x(`//li[contains(., "hl_onlinejobs")]/span[contains(., "{")]`))[0];
        const jobsJSON = await (await onlineJobs.getProperty("innerText")).jsonValue();

        response.status = "success";
        response.jobs = await JSON.parse(jobsJSON);
    } catch (e) {
        response.status = "error";
        response.error = e;
    }

    browser.close();

    return response
}

//https://servers.fivem.net/servers/detail/a45da3
//https://servers.fivem.net/servers/detail/m4kqjq

if (isDevelopment) {
    getOnlineJobs("https://servers.fivem.net/servers/detail/a45da3")
}

module.exports = getOnlineJobs;