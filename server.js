const express = require('express');
const request = require('request-promise');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.get('/',(req,res) => res.sendFile(__dirname + "/public/netpix.html"));

app.listen(PORT, () => console.log('On port 3000'));