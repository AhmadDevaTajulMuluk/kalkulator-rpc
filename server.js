const express = require("express");
const { JSONRPCServer } = require("json-rpc-2.0");

const app = express();
const server = new JSONRPCServer();

server.addMethod("add", ({ a, b }) => a + b);
server.addMethod("subtract", ({ a, b }) => a - b);
server.addMethod("multiply", ({ a, b }) => a * b);
server.addMethod("divide", ({ a, b }) => {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
});

app.use(express.json());
app.use(express.static("public"));

app.post("/rpc", (req, res) => {
  server.receive(req.body).then((jsonRPCResponse) => {
    if (jsonRPCResponse) {
      res.json(jsonRPCResponse);
    } else {
      res.sendStatus(204);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
