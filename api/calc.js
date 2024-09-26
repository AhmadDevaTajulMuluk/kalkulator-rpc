const { Server } = require("json-rpc-2.0");
const net = require("net");
const cors = require('cors');

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

// Fungsi untuk menangani request
module.exports = async (req, res) => {
    try {
      console.log(`Received ${req.method} request`);
  
      if (req.method === "POST") {
        let body = '';
  
        req.on('data', chunk => {
          body += chunk.toString();
        });
  
        req.on('end', async () => {
          try {
            console.log("Request Body:", body);
            const response = await rpcServer.receive(body);
            console.log("RPC Response:", response);
            res.status(200).json(response);  // Jika berhasil, kirim respons JSON
          } catch (error) {
            console.error("Error during RPC processing:", error.message);
            res.status(500).json({ error: "Server error during RPC processing." });
          }
        });
      } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
      }
    } catch (error) {
      console.error("Server Error:", error.message);
      res.status(500).json({ error: "Internal Server Error." });
    }
  };
  


