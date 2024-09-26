const express = require("express");
const { JSONRPCServer } = require("json-rpc-2.0");

const app = express();
const server = new JSONRPCServer();

// Add your JSON-RPC methods
server.addMethod("add", ({ a, b }) => a + b);
server.addMethod("subtract", ({ a, b }) => a - b);
server.addMethod("multiply", ({ a, b }) => a * b);
server.addMethod("divide", ({ a, b }) => {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
});

// Middleware for parsing JSON
app.use(express.json());

// Serve static files from the public directory
app.use(express.static("public"));

// Serve the index.html when accessing the root path
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Route for handling JSON-RPC requests
app.post("/rpc", (req, res) => {
  server.receive(req.body).then((jsonRPCResponse) => {
    if (jsonRPCResponse) {
      res.json(jsonRPCResponse);
    } else {
      res.sendStatus(204);
    }
  }).catch((error) => {
    // Log the error to the console for debugging
    console.error(error);
    // Respond with a JSON error message
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

// Set the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
