const express = require("express");
const { Server } = require("json-rpc-2.0");
const net = require("net");
const path = require("path");

const app = express();
const port = 4000;

// Inisialisasi server RPC
const rpcServer = new Server({
  methods: {
    add: ({ a, b }) => a + b,
    subtract: ({ a, b }) => a - b,
    multiply: ({ a, b }) => a * b,
    divide: ({ a, b }) => {
      if (b === 0) throw new Error("Division by zero");
      return a / b;
    },
  },
});

// Menyajikan halaman HTML
app.use(express.static(path.join(__dirname, 'public')));

app.get('/rpc', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Membuat server TCP untuk menangani request RPC
const tcpServer = net.createServer((socket) => {
  socket.on("data", (data) => {
    const request = data.toString();
    rpcServer.receive(request).then((response) => {
      if (response) {
        socket.write(JSON.stringify(response));
      }
    });
  });
});

// Menjalankan server pada port 4000
tcpServer.listen(4000, () => {
  console.log("RPC Kalkulator server berjalan di port 4000");
});

// Menjalankan server web pada port 3000
app.listen(3000, () => {
  console.log("Server web berjalan di port 3000");
});
