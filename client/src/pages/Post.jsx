import React, { useCallback, useEffect, useState } from 'react'
import {AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete} from 'react-icons/ai'
import Moment from 'react-moment'
import axios from '../utils/axios'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { removePost } from '../redux/features/post/postSlice'
import { createComment, getPostComments } from '../redux/features/comment/commentSlice'
import {toast} from 'react-toastify'
import CommentItem from '../components/CommentItem'

export const Post = () => {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');


  const {comments} = useSelector((state) => state.comment);
  const {user} = useSelector((state) => state.auth);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removePostHandler = () => {
    try {
      dispatch(removePost(params.id));
      toast('Успешно!')
      navigate('/posts');
    } catch (error) {
      console.log(error);
    }
  }

  const fetchPost = useCallback(async () => {
    const {data} = await axios.get(`/posts/${params.id}`)
    setPost(data);
  }, [params.id])

  const fetchComments = useCallback( async () => {
    try {
      dispatch(getPostComments(params.id));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, params.id]);


  useEffect(() => {
    fetchPost();
  }, [fetchPost])

  useEffect(() => {
    fetchComments();
  }, [fetchComments])

  if(!post){
    return (
        <div className='text-xl text-center text-lime-700 py-10'>
            Загрузка...
        </div>
    )
  }

  const submitHandler = () => {
    try {
      const postId = params.id;
      dispatch(createComment({postId, comment}))
      setComment('');
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div>
      <button className='flex justify-center items-center bg-orange-300 text-sm text-lime-700 rounded-sm py-2 px-4'>
        <Link className='flex' to={'/'}>Назад</Link>
      </button>

      <div className='flex gap-10 py-8'>
        <div className="w-2/3 ">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div className={post?.imgUrl ? 'flex rounded-sm h-80' : 'flex rounded-sm'}>
              {post?.imgUrl && (
                  <img 
                  src={`http://localhost:30002/${post.imgUrl}`} 
                  alt="Изображение статьи" 
                  className='object-cover w-full'/>
              )}
            </div>
          </div>
          <div className='flex justify-between items-center pt-2'>
              <div className='text-lg text-lime-700 opacity-50'>{post.username}</div>
              <div className='text-lg text-lime-700 opacity-50'>
                  <Moment data={post.createdAt} format='D MMM YYYY'/>
              </div>
          </div>
          <div className="text-lime-700 text-lg">{post.headline}</div>
          <p className='text-lime-700 opacity-60 text-lg pt-4'>{post.text}</p>

          <div className='flex gap-3 items-center mt-2 justify-between'>
              <div className='flex gap-3 mt-4'>
                <button className='flex items-center justify-center gap-2 text-sm text-lime-700 opacity-50'>
                    <AiFillEye/> <span>{post.views}</span>
                </button>
                <button className='flex items-center justify-center gap-2 text-sm text-lime-700 opacity-50'>
                    <AiOutlineMessage/> <span>{post.comments?.length || 0}</span>
                </button>
              </div>
              
              {
                user?._id === post.author && (
                  <div className="flex gap-3 mt-4">
                    <button className='flex items-center justify-center gap-2  text-lime-700 opacity-50'>
                    <Link to={`/${params.id}/edit`}>
                      <AiTwotoneEdit/> 
                    </Link>
                    </button>
                    <button 
                    onClick={removePostHandler}
                    className='flex items-center justify-center gap-2  text-lime-700 opacity-50'>
                    <AiFillDelete/> 
                    </button>
                  </div>
                )
              }
          </div>
        </div>
        <div className="w-1/3 p-8 bg-orange-200 flex flex-col gap-2 rounded-sm">
        {
                user?._id && (
              <form className='flex gap-2' onSubmit={e => e.preventDefault()}>
                <input type="text"
                value={comment}
                onChange={e => setComment(e.target.value)} 
                placeholder='Ваш комментарий'
                className='text-lime-700 w-full rounded-sm bg-orange-300 border py-2 px-2 text-sm outline-none placeholder:text-black'
                />
                
                <button type='submit'
                onClick={submitHandler}
                className='flex justify-center items-center bg-orange-300 text-lime-700 text-sm rounded-sm py-2 px-4'>
                  Опубликовать
                </button>
              </form>

                )
        }
          
          {
            comments?.map((comment) => (
              <CommentItem key={comment._id} comment={comment} />
            ))
          }
        </div>
      </div>
    </div>
  )
}
