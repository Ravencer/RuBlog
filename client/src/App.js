import {Layout} from './components/Layout.jsx'
import {Routes, Route} from 'react-router-dom'
import {MainPage} from './pages/MainPage.jsx'
import {PostsPage} from './pages/PostsPage.jsx'
import {Post} from './pages/Post.jsx'
import {CreatePost} from './pages/CreatePost.jsx'
import {LoginPage} from './pages/LoginPage.jsx'
import {Register} from './pages/Register.jsx'
import {EditPost} from './pages/EditPost.jsx'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from './redux/features/auth/authSlice.js'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch])
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<MainPage/>} />
        <Route path='posts' element={<PostsPage/>} />
        <Route path=':id' element={<Post/>} />
        <Route path='new' element={<CreatePost/>} />
        <Route path='login' element={<LoginPage/>} />
        <Route path='register' element={<Register/>} />
        <Route path=':id/edit' element={<EditPost/>} />
      </Routes>


      <ToastContainer position='bottom-left' />
    </Layout>
  );
}

export default App;
