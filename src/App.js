import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import Dashboard from './pages/Dashboard/Dashboard';
// import CategoryList from './components/CategoryList';
import RegisterPage from "./pages/Register/Register";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import UserProfile from './components/UserProfile/UserProfile';
import Recipe from "./components/Recipes/Recipes";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/user-profile" element={<UserProfile/>}/>
                <Route path="/recipes" element={<Recipe/>}/>

                {/*<Route path="/footer" element={<Dashboard/>}/>*/}
                <Route path="/header" element={<Header/>}/>
                <Route path="/footer" element={<Footer/>}/>
            </Routes>
        </Router>
    );
};

export default App;
