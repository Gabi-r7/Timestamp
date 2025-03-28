const express = require('express');
const app = express();
const moment = require('moment');

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

app.post('/api/diff/:date1/:date2', function(req, res) {
    const { date1, date2 } = req.params;
    if (!isNaN(date1)) {
        date1 = Number(date1);
    }
    else if (!isNaN(date2)) {
        date2 = Number(date2);
    }
    let returnDate1 = moment(new Date(date1)); //bug aq se for em utc
    let returnDate2 = moment(new Date(date2));
    console.log(returnDate1, returnDate2);

    const dias = returnDate1.diff(returnDate2, 'days');
    returnDate2.add(dias, 'days');
    const horas = returnDate1.diff(returnDate2, 'hours');
    returnDate2.add(horas, 'hours');
    const minutos = returnDate1.diff(returnDate2, 'minutes');
    returnDate2.add(minutos, 'minutes');
    const segundos = returnDate1.diff(returnDate2, 'seconds');

    if (dias === 0 && horas === 0 && minutos === 0 && segundos === 0) {
        return res.json({ 
            error: 'Invalid Date' 
        });
    }
    res.json({ 
        dias: dias, 
        horas: horas, 
        minutos: minutos, 
        segundos: segundos
    });
});