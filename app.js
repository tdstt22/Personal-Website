const express = require("express");
const indexRouter = require("./routes/index");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use("/", express.static(__dirname + "/views"));

app.use (function (req, res, next) {
        if (req.secure) {
                // request was via https, so do no special handling
                next();
        } else {
                // request was via http, so redirect to https
                res.redirect('https://' + req.headers.host + req.url);
        }
});

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Resource not found.");
  err.status = 404;
  next(err);
  // res.sendFile(__dirname + "/landing/404.html");
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.sendFile(__dirname + "/landing/401.html");
  res.end();
});

const port =
  process.env.NODE_ENV == "production" ? 8080 : process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}.`));

