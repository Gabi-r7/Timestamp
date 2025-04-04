async function converterData(inputValue, fusoValue) {
    conversaoEmUTC.innerHTML = '';
    conversaoEmUnix.innerHTML = '';

    const response = await fetch(`api/${inputValue}?fuso=${fusoValue}`, {
        method: 'GET',
    });
    const responseJson = await response.json();
    if (responseJson.error) {
        conversaoEmUnix.innerHTML = responseJson.error;
        conversaoEmUTC.innerHTML = responseJson.error;
        console.log(responseJson.error);
        return;
    }
    conversaoEmUnix.innerHTML = responseJson.unix;
    conversaoEmUTC.innerHTML = responseJson.utc;
}

async function calcularDiferenca(inputDiferenca1, inputDiferenca2) {
    let diferencaDias = document.getElementById('diferencaDias');
    let diferencaHoras = document.getElementById('diferencaHoras');
    let diferencaMinutos = document.getElementById('diferencaMinutos');
    let diferencaSegundos = document.getElementById('diferencaSegundos');

    diferencaDias.innerHTML = '';
    diferencaHoras.innerHTML = '';
    diferencaMinutos.innerHTML = '';
    diferencaSegundos.innerHTML = '';
    const response = await fetch(`/api/diff/${inputDiferenca1}/${inputDiferenca2}`, {
        method: 'POST',
    });
    const responseJson = await response.json();
    if (responseJson.error) {
        diferencaDias.innerHTML = responseJson.error;
        diferencaHoras.innerHTML = responseJson.error;
        diferencaMinutos.innerHTML = responseJson.error;
        diferencaSegundos.innerHTML = responseJson.error;
        console.log(responseJson.error);
        return;
    }
    diferencaDias.innerHTML = responseJson.dias;
    diferencaHoras.innerHTML = responseJson.horas;
    diferencaMinutos.innerHTML = responseJson.minutos;
    diferencaSegundos.innerHTML = responseJson.segundos;
    console.log(responseJson);
};

setInterval(() => {
    document.getElementById('tempoAgoraEmUTC').innerHTML = new Date().toUTCString();
    document.getElementById('tempoAgoraEmUnix').innerHTML = Math.trunc(new Date().getTime() / 1000);
}, 1000);