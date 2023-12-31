import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { isAuth, logout } from '../redux/features/auth/authSlice'; 
import { toast } from 'react-toastify';

export const Navigation = () => {
  const checkAuth = useSelector(isAuth);
  const dispatch = useDispatch();

  const activeStyle = {
    color: '#4d7c0f'
  };

  const logoutHandler = () =>{
    dispatch(logout());
    window.localStorage.removeItem('token');
    toast('Вы вышли из аккаунта!')
  }


  return (
    <div className='flex py-4 justify-between items-center'>
        <span className='flex justify-center items-center w-16 h-12 bg-orange-300 text-sm text-lime-700 rounded-sm'>
          RuBlog
        </span>

        {
          checkAuth && (
            <ul className="flex gap-8">
          <li>
            <NavLink 
            to={'/'} 
            href='/' 
            className='text-sm text-gray-400 hover:text-lime-700'
            style={({isActive}) => isActive ? activeStyle : undefined}>
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink 
            to={'/posts'} 
            href='/' 
            className='text-sm text-gray-400 hover:text-lime-700'
            style={({isActive}) => isActive ? activeStyle : undefined}>
              Мои статьи
            </NavLink>
          </li>
          <li>
            <NavLink 
            to={'/new'} 
            href='/' 
            className='text-sm text-gray-400 hover:text-lime-700'
            style={({isActive}) => isActive ? activeStyle : undefined}>
              Добавить статью
            </NavLink>
          </li>
        </ul>
          )
        }

        <div className='flex justify-center items-center bg-orange-300 text-sm text-lime-700 rounded-sm px-4 py-2'>
          {checkAuth ? (
            <button onClick={logoutHandler}>Выйти</button>
          ) : (
            <Link to={'/login'}>Войти</Link>
          )}
        </div>
    </div>
  )
}
