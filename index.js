const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("hithere");
  res.send({ bye: "bye bye~" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
