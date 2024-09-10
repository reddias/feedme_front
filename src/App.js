import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components
import LoginPage from './pages/LoginPage';   // Import LoginPage component
import Dashboard from './pages/Dashboard';   // Placeholder for Dashboard component
import CategoryList from './components/CategoryList';   // Placeholder for Dashboard component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CategoryList />} />  {/* Route to LoginPage */}
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
