import React from 'react'
import {Link} from 'react-router-dom'

export const LoginPage = () => {
  return (
  <form onSubmit={e => e.preventDefault()}
  className='w-1/4 h-60 mx-auto mt-40'>
    <h1 className='text-xl text-lime-700 text-center mb-6'>Авторизация</h1>
    <label className='text-sm text-gray-400'>
      Имя пользователя:
      <input type="text" 
      placeholder='John1' 
      className='mt-1 text-black w-full rounded-lg bg-orange-300 border py-1 px-2 text-sm outline-none placeholder:text-gray-700'/>
    </label>
    <label className='text-sm text-gray-400'>
      Пароль:
      <input type="password" 
      placeholder='********' 
      className='mt-1 text-black w-full rounded-lg bg-orange-300 border py-1 px-2 text-sm outline-none placeholder:text-gray-700'/>
    </label>
    <div className='flex gap-8 justify-center mt-6'>
      <button type='submit' className='flex justify-center items-center text-sm bg-orange-300 text-lime-700 rounded-sm py-2 px-4'>
        Войти
      </button>
    </div>
    <div className='flex gap-8 justify-center mt-6'>
      <Link to={'/register'} className='flex justify-center items-center text-sm text-lime-700 '>
        Создать аккаунт
      </Link>
    </div>
  </form>
  )
}
