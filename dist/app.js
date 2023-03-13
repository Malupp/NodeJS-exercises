"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/movies", (req, res) => {
    res.json([{ name: "The Great War" }, { name: "Matrix" }]);
});
exports.default = app;
//# sourceMappingURL=app.js.map