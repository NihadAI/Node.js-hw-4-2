"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
class FileDB {
    constructor(schemaName) {
        this.schemaName = schemaName;
    }
    static async readDatabase() {
        try {
            const data = await fs_1.default.promises.readFile(path_1.default.join(__dirname, 'db.json'), 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            return [];
        }
    }
    static async saveToFile(data) {
        try {
            await fs_1.default.promises.writeFile(path_1.default.join(__dirname, 'db.json'), JSON.stringify(data, null, 2), 'utf-8');
        }
        catch (error) {
            console.log(error);
        }
    }
    static registerSchema(schemaName, schema) {
        this.schemas[schemaName] = schema;
    }
    static async getTable(schemaName) {
        const schema = this.schemas[schemaName];
        if (!schema) {
            throw new Error(`Schema: '${schemaName}' is not registered!`);
        }
        return new FileDB(schemaName);
    }
    async getAll() {
        try {
            const database = await FileDB.readDatabase();
            return database;
        }
        catch (error) {
            throw error;
        }
    }
    async getById(id) {
        try {
            const database = await FileDB.readDatabase();
            const post = database.find((item) => item.id === id);
            if (!post) {
                throw new Error("Post not found");
            }
            return post;
        }
        catch (error) {
            throw error;
        }
    }
    async create(field) {
        try {
            if (!field.title || !field.text) {
                throw new Error("Title and text required");
            }
            const database = await FileDB.readDatabase();
            const newRecord = Object.assign({ id: (0, uuid_1.v4)(), createdAt: new Date() }, field);
            database.push(newRecord);
            await FileDB.saveToFile(database);
            return newRecord;
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, updatedFields) {
        try {
            const database = await FileDB.readDatabase();
            const recordToUpdateIndex = database.findIndex((item) => item.id === id);
            const recordToUpdate = database[recordToUpdateIndex];
            const updatedRecord = Object.assign(Object.assign({}, recordToUpdate), updatedFields);
            database[recordToUpdateIndex] = updatedRecord;
            await FileDB.saveToFile(database);
            return database[recordToUpdateIndex];
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const database = await FileDB.readDatabase();
            const index = database.findIndex((item) => item.id === id);
            if (index === -1) {
                throw new Error("Post not found");
            }
            const deletedPost = database.splice(index, 1)[0];
            await FileDB.saveToFile(database);
            return deletedPost;
        }
        catch (error) {
            throw error;
        }
    }
}
FileDB.schemas = {};
exports.default = FileDB;
