import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Component/login';
import UpdatePassword from './Component/updatepassword';
import Loginpage from './Component/loginpage';
import ResetPassword from './Component/resetpassword';
import './App.css';

function App() {
  return (
    <Router>
      <div className='main'>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/update-password" element={<UpdatePassword />} />
          <Route exact path="/reset-password" element={<ResetPassword />} />
          <Route exact path="/login-page" element={<Loginpage />} />

        </Routes>
      </div >
    </Router>



  );
}

export default App;
