const express = require('express');
const app = express();

app.get('/', function (req, res) {
    setTimeout(() => res.send('resolved'), 3000);

});

app.listen(5000, function () {
    console.log('Example app listening on port 7000!');
});
