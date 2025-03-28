// document.addEventListener("DOMContentLoaded", () => {
//     const input = document.getElementById('input');
//     const conversaoEmUnix = document.getElementById('conversaoEmUnix');
//     const conversaoEmUTC = document.getElementById('conversaoEmUTC');

    

//     const inputDiferenca1 = document.getElementById('inputDiferenca1');
//     const inputDiferenca2 = document.getElementById('inputDiferenca2');

//     addEventListener('keydown', (event) => {
//         if (event.key === 'Enter') {
            
//         }
//     });
// });

async function converterData(inputValue) {
    conversaoEmUTC.innerHTML = '';
    conversaoEmUnix.innerHTML = '';

    const response = await fetch(`/api/${inputValue}`, {
        method: 'POST',
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
    document.getElementById('tempoAgoraEmUnix').innerHTML = Date.now();
}, 1000);