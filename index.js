const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, 'public');

// use the public folder for static files
app.use(express.static(publicPath));

// set up routes
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// start the http server
http.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
