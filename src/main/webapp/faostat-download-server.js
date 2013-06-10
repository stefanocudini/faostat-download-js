var express = require("express");
var app = express();
    
app.get("/", function(req, res) {
  res.redirect("/indexold.html");
});

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname));
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
  app.use(app.router);
});

app.listen(1234);
console.log("FAOSTAT Download is running at: http://localhost:1234/");
