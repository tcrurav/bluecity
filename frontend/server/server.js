//Using https
const https = require('https');
const fs = require('fs');
const options = {
   key: fs.readFileSync('server/.cert/certificate.key'),
   cert: fs.readFileSync('server/.cert/certificate.crt')
 };

const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'build');
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

app.get("/service-worker.js", (req, res) => {
   res.sendFile(path.resolve(publicPath, "service-worker.js"));
 });

app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});

//Using https
const server = https.createServer(options, app);

server.listen(port, () => {
   console.log('Server is up!');
});