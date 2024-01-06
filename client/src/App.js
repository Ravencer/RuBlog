import {Layout} from './components/Layout.jsx'
import {Routes, Route} from 'react-router-dom'
import {MainPage} from './pages/MainPage.jsx'
import {PostsPage} from './pages/PostsPage.jsx'
import {Post} from './pages/Post.jsx'
import {CreatePost} from './pages/CreatePost.jsx'
import {LoginPage} from './pages/LoginPage.jsx'
import {Register} from './pages/Register.jsx'
import {EditPost} from './pages/EditPost.jsx'

function App() {
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
    </Layout>
  );
}

export default App;
