import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './Login.jsx'
import RegisterPage from './Register.jsx'

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element= {<LoginPage />} />
        <Route path="/register" element= {<RegisterPage />} />
      </Routes>
    </Router>
  </StrictMode>
)