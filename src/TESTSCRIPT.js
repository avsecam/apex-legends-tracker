const axios = require("axios")
const util = require("util")

const apiKey = "MTB44tlehnXiIpXgt9hv"

axios
	.get(`https://api.mozambiquehe.re/bridge?version=5&platform=PC&player=avsecam&auth=${apiKey}`)
	.then(res => {
		console.log(util.inspect(res, false, null, true))
})

// console.log("HEY");
// var radioButtons = document.querySelectorAll("input[type='radio']");
// console.log(radioButtons);