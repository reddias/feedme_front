import React from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {getUserFromLocalStorage} from '../../utils/authHelper';


const Dashboard = () => {

    const user = getUserFromLocalStorage();

    return (
        <>
            <Header user={user}/>
            <div>
                <h1>Welcome to the Dashboard</h1>
            </div>
            <Footer/>
        </>
    );
};

export default Dashboard;
