"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 80;
function serveStaticIf200(req, res, next) {
    const responseStatus = process.env.STATE === 'PENDING' ? 500 : 200;
    if (responseStatus === 200) {
        express_1.default.static(path_1.default.join(__dirname, 'public'))(req, res, next);
    }
    else {
        next();
    }
}
app.use(serveStaticIf200);
app.get('/*', (req, res) => {
    console.log("Env variable: ", process.env.STATE);
    const responseStatus = process.env.STATE === 'PENDING' ? 500 : 200;
    res.status(responseStatus).send('Root route response');
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
