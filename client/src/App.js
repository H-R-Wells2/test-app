import './App.css';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import AuthState from './context/auth/AuthState';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import RegisterForm from './components/RegisterForm';
import Navbar from './components/Navbar';





function App() {
  return (
    <>
    <BrowserRouter>

      <AuthState>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path={"/login"} element={<LoginForm/>} />
          <Route path={"/register"} element={<RegisterForm/>} />
        </Routes>
      </AuthState>
    </BrowserRouter>
    </>
  );
}

export default App;
