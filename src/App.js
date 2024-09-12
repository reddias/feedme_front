import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components
import LoginPage from './pages/Login/LoginPage';   // Import LoginPage component
import Dashboard from './pages/Dashboard';   // Placeholder for Dashboard component
// import CategoryList from './components/CategoryList';
import RegisterPage from "./pages/Register/register";   // Placeholder for Dashboard component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />  {/* Route to LoginPage */}
                <Route path="/register" element={<RegisterPage />} />  {/* Route to LoginPage */}
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
