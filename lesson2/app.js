const express = require("express");
const utility = require("utility");

const app = express();
app.get("/", (req, res) => {
  let q = req.query.q;
  let md5Value = utility.md5(q);
  res.send(md5Value);
});
app.listen(3001, () => {
  console.log("监听3001端口");
});
//http://localhost:3001/?q=yoki
