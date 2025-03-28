const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(express.json());
// Servir arquivos estáticos da pasta atual
app.use(express.static(__dirname));

let indexFile = __dirname + '/src/index.html';

app.get('/', function(req, res) {
    res.sendFile(indexFile);
  });

app.post('/api/:date?', function(req, res) {
    let utc, unix;
    const { date } = req.params;
    console.log(date);
    let returnDate;
    
    if (!date) {
        utc = new Date(Date.now()).toUTCString();
        unix = Date.now() /1000;
    }
    else{
        returnDate = Number(date); //unix
        utc = new Date(returnDate).toUTCString();
        unix = new Date(returnDate).getTime();

        if (utc === 'Invalid Date') { //utc já é utc
            utc = new Date(date).toUTCString();
            unix = Date.parse(new Date(date));
        }
        if(utc === 'Invalid Date' && isNaN(unix)){
            return res.json({ 
                error: 'Invalid Date' 
            });
        }
    }
    res.json({ 
        utc: utc, 
        unix: Math.trunc(unix)
    });
});