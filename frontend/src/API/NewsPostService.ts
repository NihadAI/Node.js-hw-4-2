import axios from "axios";

export default class NewsPostService {
  static async getAllPosts() {
    try {
      const response = await axios.get('http://localhost:8000/newsposts')
      return response
    } catch (error) {
      throw error; 
    }
  }

  static async getPostByID(id: string) {
    try {
      const response = await axios.get(`http://localhost:8000/newsposts/${id}`)
      return response
    } catch (error) {
      throw error; 
    }
  }

  static async createPost(post:IPost){
    try {
      const response = await axios.post('http://localhost:8000/newsposts', post)
      return response
    } catch (error) {
      throw error; 
    }
  }

  static async updatePost(id: string, post:IPost){
    try {
      const response = await axios.put(`http://localhost:8000/newsposts/${id}`, post)
      return response
    } catch (error) {
      throw error; 
    }
  }

  static async deletePost(id: string, ){
    try {
      const response = await axios.delete(`http://localhost:8000/newsposts/${id}`)
      return response
    } catch (error) {
      throw error; 
    }
  }
    
}
