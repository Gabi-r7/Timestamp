document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById('input');
    const conversaoEmUnix = document.getElementById('conversaoEmUnix');
    const conversaoEmUTC = document.getElementById('conversaoEmUTC');
    addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            converterData(input.value, conversaoEmUnix, conversaoEmUTC);
        }
    });
});

async function converterData(inputValue) {
    conversaoEmUTC.innerHTML = '';
    conversaoEmUnix.innerHTML = '';

    const data = { inputValue };
    const response = await fetch('/converter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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

setInterval(() => {
    document.getElementById('tempoAgoraEmUTC').innerHTML = new Date().toUTCString();
    document.getElementById('tempoAgoraEmUnix').innerHTML = Math.trunc(Date.now() / 1000);
}, 1000);