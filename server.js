const express = require("express");

const app = express();

const BOT_TOKEN = "8999239956:AAEziSjjdGG1VLLjHOzncq9gIys3CLGLkv0";
const CHAT_ID = "5195397602";

app.get("/", (req, res) => {
  res.send("Boiler Gateway OK");
});

app.get("/send", async (req, res) => {
  const text = req.query.text || "empty";

  try {
    const url =
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage` +
      `?chat_id=${CHAT_ID}` +
      `&text=${encodeURIComponent(text)}`;

    const response = await fetch(url);
    const result = await response.json();

    console.log("TELEGRAM RESULT:", result);

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(result));

  } catch (err) {
    console.log("SERVER ERROR:", err);

    res.status(500).json({
      ok: false,
      error: String(err)
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
