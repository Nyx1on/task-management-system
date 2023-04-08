import './App.css';
import './style.scss';
import Home from './pages/Home';
import {Routes, Route} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Detail from './pages/Detail';
import AddEditTask from './pages/AddEditTask';
import About from './pages/About';
import Notfound from './pages/Notfound';
import Header from './components/Header';
import { useEffect,useState } from 'react';
import Auth from './pages/Auth';
import {auth} from './firebase';
import { signOut } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout = (event) => {
    signOut(auth).then(()=> {
      setUser(null);
    })
  }

  return (
    <div className="App">
      <ToastContainer/>
      <Header user={user} handleLogout={handleLogout}/>
      <Routes>
        <Route path="/" element={<Home user={user}/>} />
        <Route path="/detail/:id" element={<Detail/>} />
        <Route path="/add/:id" element={<AddEditTask/>} />
        <Route path="/update/:id" element={<AddEditTask/>} />
        <Route path="/about" element={<About/>} />
        <Route path="*" element={<Notfound/>} />
        <Route path="/auth" element={<Auth setUser={setUser}/>} />
      </Routes>
    </div>
  );
}

export default App;
