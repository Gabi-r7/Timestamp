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

app.get('/api/:date/:fuso?', function(req, res) { //parei aqui (tá dando erro)
    let utc, unix, returnDate
    const { date, fuso } = req.params;
    
    if (!isNaN(date)) { //data em milissegundos
        returnDate = Number(date);
    }
    else { //data em utc
        returnDate = Date.parse(date);
        if (fuso) returnDate = returnDate + (fuso * 60 * 60 * 1000);
    }
    
    returnDate = Date.parse(new Date(returnDate));

    unix = Math.trunc(new Date(returnDate).getTime() / 1000);
    utc = new Date(returnDate).toUTCString();

    if (isNaN(unix)) {
        return res.json({ 
            error: 'Invalid Date' 
        });
    }

    res.json({ 
        utc: utc, 
        unix: unix
    });
});

app.post('/api/diff/:date1/:date2', function(req, res) {
    let { date1, date2 } = req.params;
    console.log(date1, date2);
    if (!isNaN(date1)) {
        date1 = Number(date1);
    }
    else if (!isNaN(date2)) {
        date2 = Number(date2);
    }
    let returnDate1 = moment(new Date(date1));
    let returnDate2 = moment(new Date(date2));
    console.log(returnDate1, returnDate2);

    const dias = Math.abs(returnDate1.diff(returnDate2, 'days'));
    returnDate2.add(dias, 'days');
    const horas = Math.abs(returnDate1.diff(returnDate2, 'hours'));
    returnDate2.add(horas, 'hours');
    const minutos = Math.abs(returnDate1.diff(returnDate2, 'minutes'));
    returnDate2.add(minutos, 'minutes');
    const segundos = Math.abs(returnDate1.diff(returnDate2, 'seconds'));

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