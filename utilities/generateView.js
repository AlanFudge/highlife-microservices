require("dotenv").config({ path: "../.env" });

const generateView = (response) => {
    if (response.status == "success") {
        jobs = Object.keys(response.jobs);
        let view = "<h1>Online Jobs</h1><br><ul>";

        jobs.forEach(job => {
            view += `<li>${job}: ${response.jobs[job]}</li>`;
        });

        view += "</ul>";

        return view;
    } else {
        return "<h1>Error</h1>";
    }
}

module.exports = generateView;