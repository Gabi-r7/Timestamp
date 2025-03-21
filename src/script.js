async function converterParaUTC(){
    input = document.getElementById('unix').value;
    resposta = document.getElementById('respostaEmUTC');
    const data = { input };
    const response = await fetch('/converterParaUTC', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const responseJson = await response.json();
    resposta.innerHTML = responseJson.utc;
}