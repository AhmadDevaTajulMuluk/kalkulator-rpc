function calculate(method) {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);

    const request = {
        jsonrpc: "2.0",
        method: method,
        params: { a: num1, b: num2 },
        id: 1,
    };

    fetch('/api/calc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").innerText = data.result;
    })
    .catch(error => {
        console.error("Error:", error);
    });
}
