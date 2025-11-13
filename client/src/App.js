import {Routes, Route} from 'react-router-dom'


import Register from "./pages/Auth/Register";
import Landing from './pages/Landing/Landing';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/Home/HomePage';
import About from './pages/About/About';
import TodoList from './pages/Todos/TodoList';
import Login from './pages/Auth/login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element = {<Landing/>} />
        <Route path='/home' element = {<HomePage/>} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/register' element = {<Register/>} />
        <Route path='/about' element = {<About/>} />
        <Route path='/todoList' element = {<TodoList/>} />
      </Routes>
      < Toaster/>
    </div>
  );
}

export default App;
