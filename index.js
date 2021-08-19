const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("hithere");
  res.send({ hi: "listen to port 5000" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
