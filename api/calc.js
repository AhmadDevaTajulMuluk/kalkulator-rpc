const { Server } = require("json-rpc-2.0");
const net = require("net");

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
  if (req.method === "POST") {
    const requestData = req.body;
    try {
      const response = await rpcServer.receive(JSON.stringify(requestData));
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
