const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Boiler Gateway OK");
});

app.get("/send", (req, res) => {
  const text = req.query.text || "empty";
  console.log("MESSAGE:", text);
  res.send("OK: " + text);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
