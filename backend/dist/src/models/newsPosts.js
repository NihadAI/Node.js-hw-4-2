"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileDB = void 0;
const FileDB_1 = __importDefault(require("../middleware/FileDB"));
exports.FileDB = FileDB_1.default;
const newspostSchema = {
    id: '',
    title: '',
    text: '',
    createdAt: new Date(),
};
FileDB_1.default.registerSchema('newspost', newspostSchema);
