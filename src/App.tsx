import './PokemonStyle.css';
import SignUp from './SignUp.tsx';
import Home from './Home.tsx';
import Login from './Login.tsx'
import { Routes, Route, Link } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/"> Home </Link> 
        <Link to="/signup"> Sign Up </Link>
        <Link to="/login"> Login </Link>
      </nav>
      <div className="tabs">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;