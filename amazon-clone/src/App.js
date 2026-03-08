import './App.css';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from './Checkout';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe("pk_test_51T87vJ1u2gnNectqJXO6S7vLiXPwaJmkBLCjTDv3ZTZOsnTUWNZYW98DaSdVvwc5OY6N5zTR5UwmD2HRt9Cc5utB00AAC2Iije");

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...
    auth.onAuthStateChanged((authUser) => {
      console.log("user: ", authUser);

      if (authUser) {
        // the user just logged in or was logged in previously
        dispatch({
          type: "SET_USER",
          user: authUser
        })
      } else {
        // user is logged out
        dispatch({
          type: "SET_USER",
          user: null
        })
      }

    })
  }, [])

  return (
    // BEM
    <div className="app">
      <Router>
        <Header/>
        <Routes>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={
             <Elements stripe={promise}>
               <Payment />
             </Elements>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
