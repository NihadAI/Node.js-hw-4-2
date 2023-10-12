import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import NewsPostService from '../../API/NewsPostService';
import Button from '../../components/UI/button/Button';
import Header from '../../components/header/Header';

function UpdatePost() {
    const params = useParams<{ id: string}>()
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');

    const updatePost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newPost: IPost = {
        title,
        text,
        };
        try {
        const response = await NewsPostService.updatePost(params.id || '', newPost);
        if (response.status === 200) {
            setMessage('Post update successfully!');
            setTimeout(() => {
            setMessage('');
            }, 2000);
        } 
        setTitle('');
        setText('');
        } catch (error) {
        console.error(error);
        }
    };

    return (
        <>
        <Header />
        <div className='create-post__container'>
            <h1 className='create-post__title'>Update your post!</h1>
            <form className='create-post__form' onSubmit={(e) => updatePost(e)}>
            <input
                type='text'
                placeholder='Write post title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type='text'
                placeholder='Write post text'
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <Button className='create-post__button' type='submit'>
                Create
            </Button>
            </form>
            {message && <h1 className='create-post__message'>{message}</h1>}
        </div>
        </>
    );
}

export default UpdatePost