"use strict";

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _Connect = require("./Databases/Connect");

var _bookRouters = _interopRequireDefault(require("./routers/bookRouters"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
(0, _Connect.ConnectDatabase)();
var port = process.env.PORT || 5000;
app.use("/api/books", _bookRouters.default);
app.use(_express.default.static(_path.default.resolve(__dirname, "../client", "build")));
app.get("/*", function (req, res) {
  res.sendFile(_path.default.resolve(__dirname, "../client", "build", "index.html"));
});
app.listen(port, function () {
  return console.log("server is listening on port ".concat(port));
});