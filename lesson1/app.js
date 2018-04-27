const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("hi yoki");
});
app.listen(3001, () => {
  console.log("监听3001端口");
});
