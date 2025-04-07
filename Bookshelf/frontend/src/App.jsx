import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';  // Import useEffect for checking login state
import LoginPage from './Login.jsx';
import RegisterPage from './Register.jsx';
import HomePage from './Home.jsx';
import UserSettings from './UserSettings.jsx';
import BookInfo from './BookInfo.jsx';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect to check login status when the app is loaded
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
      <Route path="/" element={null} /> {/* Root path, used for redirect */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/settings" element={<UserSettings />} />
      <Route path="/book/:id" element={<BookInfo />} /> {/* Dynamic route for book info */}
    </Routes>
  );
};

export default App;
