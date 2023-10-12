import { useEffect, useState } from 'react';
import NewsPost from '../newsPost/NewsPost'
import './NewsList.css'
import NewsPostService from '../../API/NewsPostService';

function NewsList() {
  const [posts, setPosts] = useState<IPost[]>([])
  
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await NewsPostService.getAllPosts();
        setPosts(response.data); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllPosts();
  }, []);
  
const renderPosts = posts.map((post)=> {
  return <NewsPost key={post.id} title={post.title} createdAt={post.createdAt} text={post.text} id={post.id}/>
})  

  return (
    <section className='news'>
      <div className='news__container'>
       {renderPosts}
      </div>
    </section>
  )
}

export default NewsList