const express = require("express");

const app = express();

const BOT_TOKEN = "8999239956:AAEziSjjdGG1VLLjHOzncq9gIys3CLGLkv0";
const CHAT_ID = "5195397602";

app.use((req, res, next) => {
  console.log("===== INCOMING REQUEST =====");
  console.log("METHOD:", req.method);
  console.log("URL:", req.url);
  console.log("HEADERS:", req.headers);
  console.log("============================");
  next();
});

app.get("/", (req, res) => {
  res.json({
    ok: true,
    service: "Boiler Gateway",
    status: "ROOT_OK"
  });
});

app.get("/send", async (req, res) => {
  const text = req.query.text || "empty";

  console.log("SEND TEXT:", text);

  try {
    const url =
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage` +
      `?chat_id=${CHAT_ID}` +
      `&text=${encodeURIComponent(text)}`;

    const response = await fetch(url);
    const result = await response.json();

    console.log("TELEGRAM RESULT:", result);

    res.json(result);

  } catch (err) {
    console.log("SERVER ERROR:", err);

    res.status(500).json({
      ok: false,
      error: String(err)
    });
  }
});

app.use((req, res) => {
  console.log("404 ROUTE:", req.method, req.url);

  res.status(404).json({
    ok: false,
    error: "Route not found",
    method: req.method,
    url: req.url
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
