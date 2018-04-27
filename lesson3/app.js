const express = require("express");
const app = express();
const superagent = require("superagent");
const cheerio = require("cheerio");
app.get("/", (req, res, next) => {
  superagent.get("https://cnodejs.org/").end((err, sres) => {
    if (err) {
      return next(err);
    }
    //sres.text是网页内容
    let $ = cheerio.load(sres.text);
    let items = [];
    $("#topic_list .topic_title").each(function(idx, element) {
      let $element = $(element);
      items.push({
        title: $element.attr("title"),
        href: $element.attr("href")
      });
    });

    res.send(items);
  });
});
app.listen(3001, () => {
  console.log("监听3001端口");
});
