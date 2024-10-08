import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import Dashboard from './pages/Dashboard/Dashboard';
import RegisterPage from "./pages/Register/Register";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import UserProfile from './components/UserProfile/UserProfile';
import RecipeSearch from "./components/RecipeSearch/RecipeSearch";
import AdminLoginPage from "./pages/Admin/Login/LoginPage";
import NavigationDrawer from "./components/Admin/NavigationDrawer/NavigationDrawer";
import Statistics from "./pages/Admin/Statistics/Statistics";
import Users from "./pages/Admin/Users/Users";
import Recipes from "./pages/Admin/Recipes/Recipes";
import SettingsPage from "./pages/Admin/Settings/Settings";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/user-profile" element={<UserProfile/>}/>
                <Route path="/recipes" element={<RecipeSearch/>}/>

                <Route path="/admin/login" element={<AdminLoginPage/>}/>

                <Route path="/admin/nav" element={<NavigationDrawer/>}/>
                <Route path="/admin/users" element={<Users/>}/>
                <Route path="/admin/statistics" element={<Statistics/>}/>
                <Route path="/admin/recipes" element={<Recipes/>}/>
                <Route path="/admin/settings" element={<SettingsPage/>}/>

                <Route path="/header" element={<Header/>}/>
                <Route path="/footer" element={<Footer/>}/>
            </Routes>
        </Router>
    );
};

export default App;
