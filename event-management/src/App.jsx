import React from 'react';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateEvent from './components/CreateEvent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/create-event" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
