"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALIASTEST = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.ALIASTEST = "ALIASTEST";
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.get("/", (req, res) => {
    res.send("Welcome to Express & TypeScript Server");
});
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
