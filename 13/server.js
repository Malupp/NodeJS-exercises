"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var port = 3000;
app_1["default"].listen(port, function () {
    console.log("[server]: Server is running at http://localhost:".concat(port));
});
