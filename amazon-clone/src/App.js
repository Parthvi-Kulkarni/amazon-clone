import './App.css';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from './Checkout';

function App() {
  return (
    // BEM
    <div className="app">
      <Router>
        <Header/>
        <Routes>
          <Route path="/checkout" element={
            <>
              <Checkout />
            </>
          } />
          <Route path="/login" element={
            <>
              <Login />
            </>
          } />
          <Route path="/" element={
            <>
              <Home />
            </>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
