import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { registerUser } from '../redux/features/auth/authSlice'

export const Register = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    try{
      dispatch(registerUser({username, password}));
      setPassword('');
      setUserName('');
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <form onSubmit={e => e.preventDefault()}
    className='w-1/4 h-60 mx-auto mt-40'>
      <h1 className='text-xl text-lime-700 text-center mb-6'>Регистрация</h1>
      <label className='text-sm text-gray-400'>
        Имя пользователя:
        <input type="text" 
        value={username}
        onChange={e => setUserName(e.target.value)}
        placeholder='John1' 
        className='mt-1 text-black w-full rounded-lg bg-orange-300 border py-1 px-2 text-sm outline-none placeholder:text-gray-700'/>
      </label>
      <label className='text-sm text-gray-400'>
        Пароль:
        <input type="password"
        value={password} 
        onChange={e => setPassword(e.target.value)}
        placeholder='********' 
        className='mt-1 text-black w-full rounded-lg bg-orange-300 border py-1 px-2 text-sm outline-none placeholder:text-gray-700'/>
      </label>
      <div className='flex gap-8 justify-center mt-6'>
        <button 
        type='submit'
        onClick={handleSubmit}
        className='flex justify-center items-center text-sm bg-orange-300 text-lime-700 rounded-sm py-2 px-4'>
          Зарегистрироваться
        </button>
      </div>
     <div className='flex gap-8 justify-center mt-6'>
        <Link to={'/login'} 
        className='flex justify-center items-center text-sm text-lime-700 '>
          Уже есть аккаунт?
        </Link>
      </div>
  </form>
  )
}
