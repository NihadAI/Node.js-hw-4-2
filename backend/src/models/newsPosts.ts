import FileDB from "../middleware/FileDB";


interface Post {
    id: string;
    title: string;
    text: string;
    createdAt: Date;
  }

  
const newspostSchema:Post = {
    id: '',
    title: '',
    text: '',
    createdAt: new Date(),
  };


FileDB.registerSchema('newspost', newspostSchema);
  
export {FileDB, Post} ;
  