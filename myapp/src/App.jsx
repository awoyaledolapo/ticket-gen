import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TicketType from './components/TicketType';
import FormPage from './components/FormPage';
import TicketPage from './components/TicketPage';
import Nav from './components/Nav';
 import'./App.css'
const App = () => {
  return (
  
    <Router>
      <div>
        <Nav/>
      <Routes>
        <Route path="/ticket-gen"  element={<TicketType />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/ticket" element={<TicketPage />} />
      </Routes>
      </div>
    </Router>

  );
};

export default App;
