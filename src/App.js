import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SmartLendWelcome from './components/SmartLendWelcome';
import SmartLendUnified from './components/SmartLendChat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SmartLendWelcome />} />
        <Route path="/chat" element={<SmartLendUnified />} />
      </Routes>
    </Router>
  );
}

export default App;
