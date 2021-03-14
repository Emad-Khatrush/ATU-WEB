const express    = require('express'),
      bodyParser = require("body-parser"),
      app        = express();

// require routers
const indexRoute = require("./routers/index"),
      authRoute  = require("./routers/auth");

const port = 3000;

// configure packages
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

//-------------------------------
//            Routes
//-------------------------------
app.use(indexRoute);
app.use(authRoute);


// local listener
app.listen(port, () => {
  console.log(`ATU app listening at http://localhost:${port}`);
})
