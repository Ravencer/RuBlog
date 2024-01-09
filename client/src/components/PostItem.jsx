import React from 'react';
import {AiFillEye, AiOutlineMessage} from 'react-icons/ai'
import Moment from 'react-moment'
import { Link } from 'react-router-dom';

export const PostItem = ({post}) => {

    if(!post){
        return (
            <div className='text-xl text-center text-lime-700 py-10'>
                Загрузка...
            </div>
        )
    }

    
    return (
        <Link to={`/${post._id}`}>
            <div 
                className='flex flex-col basis-1/4 flex-grow'>
                <div className={post.imgUrl ? 'flex rounded-sm h-80' : 'flex rounded-sm'}>
                    {post.imgUrl && (
                        <img 
                        src={`http://localhost:30002/${post.imgUrl}`} 
                        alt="Изображение статьи" 
                        className='object-cover w-full'/>
                    )}
                </div>
                <div className='flex justify-between items-center pt-2'>
                    <div className='text-lg text-lime-700 opacity-50'>{post.username}</div>
                    <div className='text-lg text-lime-700 opacity-50'>
                        <Moment data={post.createdAt} format='D MMM YYYY'/>
                    </div>
                </div>
                <div className="text-lime-700 text-lg">{post.headline}</div>
                <p className='text-lime-700 opacity-60 text-lg pt-4 line-clamp-3'>{post.text}</p>

                <div className='flex gap-3 items-center mt-2'>
                    <button className='flex items-center justify-center gap-2 text-sm text-lime-700 opacity-50'>
                        <AiFillEye/> <span>{post.views}</span>
                    </button>
                    <button className='flex items-center justify-center gap-2 text-sm text-lime-700 opacity-50'>
                        <AiOutlineMessage/> <span>{post.comments?.length || 0}</span>
                    </button>
                </div>
            </div>
        </Link>
    );
};