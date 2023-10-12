"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = __importDefault(require("./src/config"));
const newsPosts_1 = __importDefault(require("./src/routes/newsPosts"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const main = async () => {
    const app = (0, express_1.default)();
    const host = config_1.default.get('HOST');
    const port = config_1.default.get('PORT');
    app.use((0, cors_1.default)());
    app.use(body_parser_1.default.json());
    app.use('/', newsPosts_1.default);
    app.get('/', (_req, res) => {
        res.sendFile(path_1.default.join(__dirname, '../../frontend/public/index.html'));
    });
    app.listen(port, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });
};
main().catch((error) => {
    console.error(error);
});
