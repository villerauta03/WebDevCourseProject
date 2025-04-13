/**
 * App.jsx
 * Tässä tiedostossa määritellään reititys ja sovelluksen navigaatio. 
 * Ainut toinen toiminto on toi automaattinen siirtyminen "/":stä joko "home" tai "login" riippuen JWT tokenin olemassaolosta
 */

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

//sivut
import LoginPage from './Login.jsx';
import RegisterPage from './Register.jsx';
import HomePage from './Home.jsx';
import UserSettings from './UserSettings.jsx';
import BookInfo from './BookInfo.jsx';
import BookForm from './BookForm.jsx';
import BookEdit from './BookEdit.jsx';

const App = () => {
  //navigaation toiminta react-router-domin avulla
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    //automaattinen siirtyminen, jos ei tokenia niin vie takaisin loginiin
    //jos tokeni on, vie homeen
    if (location.pathname === "/") {
      if (token) {
        navigate("/home");
      } else {
        navigate("/login");
      }
    }
  }, [navigate, location]);

  //täällä kaikki navigaatiotoiminta, määritellään sivujen reitit
  return (
    <Routes>
      <Route path="/" element={null} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/settings" element={<UserSettings />} />
      <Route path="/book/:id" element={<BookInfo />} />
      <Route path="/book/edit/:id" element={<BookEdit />} />
      <Route path="/new-book" element={<BookForm />} />
    </Routes>
  );
};

export default App;
