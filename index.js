const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');

const port = process.env.PORT || 3000;

// use the public folder for static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'src')));

// set up routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'src', 'index.html'));
});

// start the http server
http.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
