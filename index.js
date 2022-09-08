const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'src')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'src', 'html'));
// });

// start the http server
http.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`);
});
