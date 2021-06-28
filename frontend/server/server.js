const express = require('express');
// set up plain http server for redirection to https
var http = express();

// set up a route to redirect http to https
http.get('*', function (req, res) {
   res.redirect('https://' + req.headers.host + req.url);

   // Or, if you don't want to automatically detect the domain name from the request header, you can hard code it:
   //  res.redirect('https://somosbluecity.es' + req.url);
})

// have it listen on 80
http.listen(80);

//Using https
const https = require('https');
const fs = require('fs');
const options = {
   key: fs.readFileSync('server/.cert/certificate.key'),
   cert: fs.readFileSync('server/.cert/certificate.crt')
};

const path = require('path');

const app = express();
const publicPath = path.join(__dirname, '..', 'build');
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

// app.get("/worker.js", (req, res) => {
//    res.sendFile(path.resolve(publicPath, "worker.js"));
// });

app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});

//Using https
const server = https.createServer(options, app);

server.listen(port, () => {
   console.log('Server is up!');
});