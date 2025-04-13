/**
 * main.jsx
 * tää vaan mahollistaa tän sivun toiminnallisuuden kokonaan. vois vetää tän tonne app.jsx mut en jaksanu hoitaa
 * tää ladataan tos index.html:ssä
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
)