const express = require('express'); // Importa o framework Express para criar o servidor.
const app = express(); // Cria uma instância do servidor Express.
const moment = require('moment'); // Importa a biblioteca Moment.js para manipulação de datas.

const PORT = process.env.PORT || 3000; // Define a porta do servidor. Usa a variável de ambiente PORT ou a porta 3000 como padrão.
app.listen(PORT, () => { // Inicia o servidor na porta definida.
    console.log(`Server is running on http://localhost:${PORT}`); // Exibe uma mensagem no console.
});

app.use(express.json()); // Middleware para interpretar requisições com corpo em JSON.
// Servir arquivos estáticos da pasta atual
app.use(express.static(__dirname)); // Permite servir arquivos estáticos (como HTML, CSS, JS) da pasta raiz do projeto.

let indexFile = __dirname + '/src/index.html'; // Caminho para o arquivo HTML principal.

app.get('/', function(req, res) {
    res.sendFile(indexFile); // Rota para a página inicial. Envia o arquivo HTML principal como resposta.
});

app.get('/api/:date?', function(req, res) { // Rota GET para retornar informações de data e hora.
    let utc, unix, returnDate; // Variáveis para armazenar a data em UTC, UNIX e o valor calculado.
    const { date } = req.params; // Obtém o parâmetro "date" da URL.
    const { fuso } = req.query; // Obtém o parâmetro "fuso" da query string.

    if (!date) { // Se nenhum parâmetro "date" for fornecido, usa a data atual.
        returnDate = Date.now(new Date());
    } else if (!isNaN(date)) { // Se "date" for um número, assume que é um timestamp em milissegundos.
        returnDate = Number(date) * 1000;
    } else { // Caso contrário, interpreta "date" como uma string de data.
        returnDate = Date.parse(date);
    }
    
    if (!isNaN(fuso)) { // Se o parâmetro "fuso" for fornecido e for um número, ajusta a data para o fuso horário.
        returnDate += fuso * 60 * 60 * 1000; // Converte o fuso horário de horas para milissegundos.
    }

    unix = Math.trunc(new Date(returnDate).getTime() / 1000); // Converte a data para o formato UNIX.
    utc = new Date(returnDate).toUTCString(); // Converte a data para o formato UTC.

    if (isNaN(unix)) { // Se a data não for válida, retorna um erro.
        return res.json({ 
            error: 'Invalid Date' 
        });
    }

    // Retorna a data em formatos UTC e UNIX.
    res.json({ 
        utc: utc, 
        unix: unix
    });
});

app.get('/api/diff/:date1/:date2', function(req, res) { // Rota GET para calcular a diferença entre duas datas.
    let { date1, date2 } = req.params; // Obtém os parâmetros "date1" e "date2" da URL.

    if (!isNaN(date1)) { // Se "date1" for um número, converte para milissegundos.
        date1 = Number(date1 * 1000);
    }
    if (!isNaN(date2)) { // Se "date2" for um número, converte para milissegundos.
        date2 = Number(date2 * 1000);
    }
    let returnDate1 = new Date(date1).toUTCString(); // Converte "date1" para o formato UTC.
    let returnDate2 = new Date(date2).toUTCString(); // Converte "date2" para o formato UTC.

    returnDate1 = moment(new Date(date1)); // Cria um objeto Moment.js para "date1".
    returnDate2 = moment(new Date(date2)); // Cria um objeto Moment.js para "date2".

    // Calcula a diferença em dias, horas, minutos e segundos.
    const dias = Math.abs(returnDate1.diff(returnDate2, 'days'));
    returnDate2.add(dias, 'days'); // Ajusta "returnDate2" para calcular as próximas diferenças.
    const horas = Math.abs(returnDate1.diff(returnDate2, 'hours'));
    returnDate2.add(horas, 'hours'); // Ajusta "returnDate2" novamente.
    const minutos = Math.abs(returnDate1.diff(returnDate2, 'minutes'));
    returnDate2.add(minutos, 'minutes'); // Ajusta "returnDate2" novamente.
    const segundos = Math.abs(returnDate1.diff(returnDate2, 'seconds'));

    if (dias === 0 && horas === 0 && minutos === 0 && segundos === 0) { // Se não houver diferença entre as datas, retorna um erro.
        return res.json({ 
            error: 'Invalid Date' 
        });
    }

    // Retorna a diferença em dias, horas, minutos e segundos.
    res.json({ 
        dias: dias, 
        horas: horas, 
        minutos: minutos, 
        segundos: segundos
    });
});