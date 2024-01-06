import React from 'react'
import {Link, NavLink} from 'react-router-dom'

export const Navigation = () => {
  const isAuth = false;

  const activeStyle = {
    color: '#4d7c0f'
  };


  return (
    <div className='flex py-4 justify-between items-center'>
        <span className='flex justify-center items-center w-6 h-6 bg-orange-300 text-sm text-lime-700 rounded-sm'>
          E
        </span>

        {
          isAuth && (
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
          {isAuth ? (
            <button>Выйти</button>
          ) : (
            <Link to={'/login'}>Войти</Link>
          )}
        </div>
    </div>
  )
}
