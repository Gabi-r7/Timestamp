async function converterData(inputValue, fusoValue) { // Função assíncrona para converter uma data fornecida em UTC e UNIX, considerando o fuso horário.

    conversaoEmUTC.innerHTML = ''; // Limpa o conteúdo anterior do elemento que exibe a conversão para UTC.
    conversaoEmUnix.innerHTML = ''; // Limpa o conteúdo anterior do elemento que exibe a conversão para UNIX.

    // Faz uma requisição GET para a API, passando a data e o fuso horário como parâmetros.
    const response = await fetch(`api/${inputValue}?fuso=${fusoValue}`, {
        method: 'GET',
    });

    const responseJson = await response.json(); // Converte a resposta da API para JSON.

    if (responseJson.error) { // Se a API retornar um erro, exibe a mensagem de erro nos elementos HTML e no console.
        conversaoEmUnix.innerHTML = responseJson.error;
        conversaoEmUTC.innerHTML = responseJson.error;
        console.log(responseJson.error);
        return; // Encerra a execução da função.
    }

    // Exibe os valores convertidos (UNIX e UTC) nos elementos HTML.
    conversaoEmUnix.innerHTML = responseJson.unix;
    conversaoEmUTC.innerHTML = responseJson.utc;
}

async function calcularDiferenca(inputDiferenca1, inputDiferenca2) { // Função assíncrona para calcular a diferença entre duas datas fornecidas.

    // Obtém os elementos HTML onde os resultados serão exibidos.
    let diferencaDias = document.getElementById('diferencaDias');
    let diferencaHoras = document.getElementById('diferencaHoras');
    let diferencaMinutos = document.getElementById('diferencaMinutos');
    let diferencaSegundos = document.getElementById('diferencaSegundos');

    // Limpa o conteúdo anterior dos elementos HTML.
    diferencaDias.innerHTML = '';
    diferencaHoras.innerHTML = '';
    diferencaMinutos.innerHTML = '';
    diferencaSegundos.innerHTML = '';

    // Verifica se os valores de entrada estão vazios. Se estiverem, exibe uma mensagem de erro e encerra a função.
    if (inputDiferenca1 === '' || inputDiferenca2 === '') {
        diferencaDias.innerHTML = 'Data inválida';
        diferencaHoras.innerHTML = 'Data inválida';
        diferencaMinutos.innerHTML = 'Data inválida';
        diferencaSegundos.innerHTML = 'Data inválida';
        return;
    }

    // Faz uma requisição GET para a API, passando as duas datas como parâmetros.
    const response = await fetch(`/api/diff/${inputDiferenca1}/${inputDiferenca2}`, {
        method: 'GET',
    });

    const responseJson = await response.json(); // Converte a resposta da API para JSON.

    if (responseJson.error) { // Se a API retornar um erro, exibe a mensagem de erro nos elementos HTML e no console.
        diferencaDias.innerHTML = responseJson.error;
        diferencaHoras.innerHTML = responseJson.error;
        diferencaMinutos.innerHTML = responseJson.error;
        diferencaSegundos.innerHTML = responseJson.error;
        console.log(responseJson.error);
        return; // Encerra a execução da função.
    }

    // Exibe os valores calculados (dias, horas, minutos e segundos) nos elementos HTML.
    diferencaDias.innerHTML = responseJson.dias;
    diferencaHoras.innerHTML = responseJson.horas;
    diferencaMinutos.innerHTML = responseJson.minutos;
    diferencaSegundos.innerHTML = responseJson.segundos;
};

setInterval(() => { // Atualiza continuamente o horário atual em UTC e UNIX a cada segundo.

    // Exibe o horário atual em UTC no elemento HTML correspondente.
    document.getElementById('tempoAgoraEmUTC').innerHTML = new Date().toUTCString();

    // Exibe o horário atual em UNIX (em segundos) no elemento HTML correspondente.
    document.getElementById('tempoAgoraEmUnix').innerHTML = Math.trunc(new Date().getTime() / 1000);
}, 1000); // Define o intervalo de atualização para 1 segundo.