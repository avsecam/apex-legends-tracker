const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cors = require("cors")
require("dotenv").config();

const app = express();

let apiKey = process.env.REACT_APP_API_KEY

app.use(cors())

app.get("/user-data", (req, res) => {
	let platform = req.query.platform
	let username = req.query.username
	axios
	.get(`https://api.mozambiquehe.re/bridge?version=5&platform=${platform}&player=${username}&auth=${apiKey}`)
	.then(response => {
		res.json(response.data)
	})
	.catch(e => {
		console.error(e)
	})
});


function getUserData(username, platform) {
	
	
	next()
}

app.listen(PORT, () => console.log(`RUNNING ON PORT ${PORT}`));