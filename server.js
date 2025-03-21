const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

let indexFile = __dirname + '/index.html';

app.get('/', function(req, res) {
    res.sendFile(indexFile);
  });