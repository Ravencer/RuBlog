import React, { useState, useCallback, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../utils/axios';
import { updatePost } from '../redux/features/post/postSlice';

export const EditPost = () => {

  const [headline, setTitle] = useState('');
  const [text, setText] = useState('');
  const [oldImage, setOldImage] = useState('');
  const [newImage, setNewImage] = useState('');
  const params = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchPost = useCallback(async () => {
    const {data} = await axios.get(`/posts/${params.id}`);
    setTitle(data.headline);
    setText(data.text);
    setOldImage(data.imgUrl);
  }, [params.id])


  const submitHandler = () => {
    try {
      const updatedPost = new FormData();
      updatedPost.append('headline', headline);
      updatedPost.append('text', text);
      updatedPost.append('id', params.id);
      updatedPost.append('image', newImage);
      dispatch(updatePost(updatedPost));
      navigate('/posts');
    } catch (error) {
      console.log(error);
    }
  }

  const clearFormHandler = () => {
    setTitle('');
    setText('');
  }

  useEffect(() => {
    fetchPost();
  }, [fetchPost])


  return (
    <form className='w-1/3 mx-auto py-10'
    onSubmit={e => e.preventDefault()}
    >
      <label 
      className='text-lime-700 py-2 bg-orange-300 text-sm mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
        Прикрепить изображение
        <input type="file" 
        className='hidden' 
        onChange={e => {
          setNewImage(e.target.files[0]);
          setOldImage('');
        }}/>
      </label>
      <div className='flex object-cover py-2'>
        {oldImage && (
          <img src={`http://localhost:30002/${oldImage}`} alt="Изображение статьи" />
        )}
        {newImage && (
          <img src={URL.createObjectURL(newImage)} alt="Изображение статьи" />
        )}
      </div>

      <label className='text-sm text-gray opacity-70'>
        Заголовок статьи
        <input type="text"
        placeholder='Заголовок' 
        value={headline}
        onChange={e => setTitle(e.target.value)}
        className='mt-1 text-black w-full rounded-lg bg-orange-200 border py-1 px-2 text-sm outline-none placeholder:text-gray'/>
      </label>

      <label className='text-sm text-gray opacity-70'>
        Текст статьи
        <textarea
        onChange={e => setText(e.target.value)}
        value={text}
        placeholder='Напишите что-нибудь...' 
        className='mt-1 text-black w-full rounded-lg bg-orange-200 border py-1 px-2 text-sm outline-none resize-none h-60 placeholder:text-gray'/>
      </label>

      <div className='flex gap-8 items-center justify-center mt-4'>
        <button 
        onClick={submitHandler}
        className='flex justiyfy-center items-center bg-orange-300 text-sm text-lime-700 rounded-sm py-2 px-4'>
          Обновить статью
        </button>
        <button 
        onClick={clearFormHandler}
        className='flex justiyfy-center items-center bg-red-300 text-sm text-lime-700 rounded-sm py-2 px-4'>
          Сбросить
        </button>
      </div>
    </form>
  )
}
