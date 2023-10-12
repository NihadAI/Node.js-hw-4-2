import { useEffect, useState } from 'react'
import NewsPostService from '../../API/NewsPostService';
import { useNavigate, useParams } from 'react-router-dom';
import './PostById.css'
import Header from '../../components/header/Header';
import Loader from '../../components/UI/loader/Loader';
import Button from '../../components/UI/button/Button';

function PostById() {
  const navigate = useNavigate()
  const params = useParams<{ id: string}>()
  const [post, setPost] = useState<IPost>()

  const fetchPostById = async (id: string) => {
    const response = await NewsPostService.getPostByID(id);
    setPost(response.data);
  };

  const deletePost = async (id: string) => {
    await NewsPostService.deletePost(id);
    navigate('/'); 
  }

  useEffect(() => {
    fetchPostById(params.id || '')
  }, [params.id])

  if (!post) {
    return <Loader/>;
  }

  return (
    <div className='wrapper__container'>
      <Header/>
      <div className='post__buttons'>
        <Button className='post__update-button' onClick={() => navigate(`/update/${params.id}`)}>Update post</Button>
        <Button className='post__delete-button' onClick={() => deletePost(params.id || '')}>Delete post</Button>
      </div>
      <div className='post__page'>
        <h1 className='post__title'>{post.title}</h1>
        <p className='post__date'>{post.createdAt}</p>
        <p className='post__full-text'>{post.text}</p>
      </div>
    </div>
  )
}

export default PostById;
