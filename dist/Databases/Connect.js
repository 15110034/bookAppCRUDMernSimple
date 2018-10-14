"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectDatabase = ConnectDatabase;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bluebird = _interopRequireDefault(require("bluebird"));

var _config = require("../config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ConnectDatabase() {
  _mongoose.default.connect(_config.DatabaseUrl, {
    useNewUrlParser: true
  });

  _mongoose.default.Promise = _bluebird.default;
  var db = _mongoose.default.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    // we're connected!
    console.log("connent success db to ".concat(_config.DatabaseUrl));
  });
}