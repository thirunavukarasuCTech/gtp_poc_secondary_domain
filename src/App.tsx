import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import HomePage from './components/ActionPerformers/HomePage/HomePage';
import HomePage from './Pages/HomePage/HomePage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import MainHeader from './components/ActionPerformers/MainHeader/MainHeader';
import CallBackPage from './Pages/CallBackPage/CallBackPage';

function App() {
  return (
    <>
      <Router>
        <MainHeader />
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/myAccount" Component={ProfilePage} />
          <Route path="/callback" Component={CallBackPage} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
