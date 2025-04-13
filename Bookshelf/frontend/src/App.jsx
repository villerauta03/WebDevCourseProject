import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import LoginPage from './Login.jsx';
import RegisterPage from './Register.jsx';
import HomePage from './Home.jsx';
import UserSettings from './UserSettings.jsx';
import BookInfo from './BookInfo.jsx';
import BookForm from './BookForm.jsx';
import BookEdit from './BookEdit.jsx';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (location.pathname === "/") {
      if (token) {
        navigate("/home");
      } else {
        navigate("/login");
      }
    }
  }, [navigate, location]);

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
