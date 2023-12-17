import {Layout} from './components/Layout.jsx'
import {Routes, Route} from 'react-router-dom'
import {MainPage} from './pages/MainPage.jsx'
import {PostsPage} from './pages/PostsPage.jsx'
import {Post} from './pages/Post.jsx'
import {CreatePost} from './pages/CreatePost.jsx'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<MainPage/>} />
        <Route path='posts' element={<PostsPage/>} />
        <Route path=':id' element={<Post/>} />
        <Route path='new' element={<CreatePost/>} />
      </Routes>
    </Layout>
  );
}

export default App;
