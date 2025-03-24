async function converterParaUTC(){
    respostaEmUTC = document.getElementById('respostaEmUTC');
    respostaEmUnix = document.getElementById('respostaEmUnix');
    respostaEmUTC.innerHTML = '';
    respostaEmUnix.innerHTML = '';
    
    let input = document.getElementById('unix').value;
    resposta = document.getElementById('resposta');
    const data = { input };
    const response = await fetch('/converterParaUTC', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const responseJson = await response.json();
    respostaEmUTC.innerHTML = responseJson.utc;
    if (!input) {
        respostaEmUnix.innerHTML = responseJson.unix;
    }
}