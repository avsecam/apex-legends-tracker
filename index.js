const PORT = 8000;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
	res.json("hello");
});

app.listen(PORT, () => console.log(`RUNNING ON PORT ${PORT}`));