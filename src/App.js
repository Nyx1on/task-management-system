import './App.css';
import Home from './pages/Home';
import {Routes, Route} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Detail from './pages/Detail';
import AddEditTask from './pages/AddEditTask';
import About from './pages/About';
import Notfound from './pages/Notfound';

function App() {
  
  return (
    <div className="App">
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/detail/:id" element={<Detail/>} />
        <Route path="/add/:id" element={<AddEditTask/>} />
        <Route path="/update/:id" element={<AddEditTask/>} />
        <Route path="/about" element={<About/>} />
        <Route path="*" element={<Notfound/>} />
      </Routes>
    </div>
  );
}

export default App;
