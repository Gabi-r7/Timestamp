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

app.post('/converterParaUTC', function(req, res) {
    const { input } = req.body;
    console.log(req.body);
    let resposta = new Date(input * 1000).toUTCString();
    res.json({ utc: resposta });
});