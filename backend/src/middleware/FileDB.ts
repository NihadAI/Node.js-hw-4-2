import fs from 'fs';
import path from 'path';
import { Post } from '../models/newsPosts';
import { v4 } from "uuid"; 

class FileDB {
  private static schemas: Record<string, Post> = {};
  public schemaName: string;
  constructor(schemaName: string) {
    this.schemaName = schemaName;
  }

  private static async readDatabase(): Promise<Post[]> {
    try {
      const data = await fs.promises.readFile(path.join(__dirname, 'db.json'), 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  private static async saveToFile(data: Post[]): Promise<void> {
    try {
        await fs.promises.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.log(error);
    }
  }

  static registerSchema(schemaName: string, schema: Post): void {
    this.schemas[schemaName] = schema;
  }

  static async getTable(schemaName: string): Promise<FileDB> {
    const schema = this.schemas[schemaName];
    if (!schema) {
      throw new Error(`Schema: '${schemaName}' is not registered!`);
    }
    return new FileDB(schemaName);
  }

  async getAll(): Promise<Post[]> {
      try {
          const database = await FileDB.readDatabase();
          return database;
      } catch (error) {
          throw error;
      }
  }

  async getById(id:string): Promise<Post> {
      try {
          const database = await FileDB.readDatabase();
          const post = database.find((item) => item.id === id);
          if(!post){
              throw new Error("Post not found")
          }
          return post
      } catch (error) {
          throw error;
      }
  }

  async create(field:Omit<Post, "id" | "createdAt">): Promise<Post> {
      try {
        if (!field.title || !field.text) {
          throw new Error("Title and text required");
        }
          const database = await FileDB.readDatabase();
          const newRecord: Post = {
          id: v4(), 
          createdAt: new Date(),
          ...field,
          };
          database.push(newRecord);
          await FileDB.saveToFile(database);
          return newRecord; 
      } catch (error) {
          throw error;
      }
  }

  async update(id: string, updatedFields: Omit<Post, "id" | "createdAt">): Promise<Post> {
    try {
        const database = await FileDB.readDatabase();
        const recordToUpdateIndex = database.findIndex((item) => item.id === id);
        const recordToUpdate = database[recordToUpdateIndex];
        const updatedRecord: Post = {
            ...recordToUpdate, 
            ...updatedFields, 
        };
        database[recordToUpdateIndex] = updatedRecord;          
        await FileDB.saveToFile(database);
        return database[recordToUpdateIndex];
    } catch (error) {
        throw error
    }
}
  
  async delete(id: string): Promise<Post> {
      try {
          const database = await FileDB.readDatabase();
          const index = database.findIndex((item) => item.id === id);
          if (index === -1) {
              throw new Error("Post not found");
            }
          const deletedPost = database.splice(index, 1)[0]
          await FileDB.saveToFile(database);
          return deletedPost;
      } catch (error) {
          throw error;
      }
  }
}



export default FileDB;
