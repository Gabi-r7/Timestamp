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
    conversaoEmUnix.innerHTML = responseJson.unix;
    conversaoEmUTC.innerHTML = responseJson.utc;
}