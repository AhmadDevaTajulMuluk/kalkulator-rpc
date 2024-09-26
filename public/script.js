function calculate(method) {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);

    const request = {
        jsonrpc: "2.0",
        method: method,
        params: { a: num1, b: num2 },
        id: 1,
    };

    console.log("Request being sent:", request);  // Log request sebelum dikirim

    fetch('/api/calc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    })
    .then(response => {
        console.log("Raw Response:", response);
        if (!response.ok) {
            console.error("Network response was not ok:", response.statusText);
            throw new Error("Network response was not ok");
        }
        return response.json();  // Parsing sebagai JSON
    })
    .then(data => {
        console.log("Response Data:", data);
        document.getElementById("result").innerText = data.result;
    })
    .catch(error => {
        console.error("Error caught:", error);
        document.getElementById("result").innerText = "Terjadi kesalahan: " + error.message;
    });
}
