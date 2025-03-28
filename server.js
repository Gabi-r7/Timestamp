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

app.post('/converter', function(req, res) {
    let utc, unix;
    const { inputValue } = req.body; 
    let inputDate;
    
    if (!inputValue) {
        utc = new Date(Date.now()).toUTCString();
        unix = Date.now() /1000;
    }
    else{
        inputDate = Number(inputValue);
        utc = new Date(inputDate).toUTCString();
        unix = new Date(inputDate).getTime() / 1000;
        if (utc === 'Invalid Date') {
            utc = new Date(inputValue).toUTCString();
            unix = Date.parse(new Date(inputValue)) / 1000;
        }
        if(utc === 'Invalid Date' && isNaN(unix)){
            res.json({ 
                error: 'Invalid Date' 
            });
        }
    }
    res.json({ 
        utc: utc, 
        unix: Math.trunc(unix)
    });
});
