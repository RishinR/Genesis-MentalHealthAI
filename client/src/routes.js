import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import DashboardLayout from './pages/DashboardLayout';
import Chatbot from './pages/Chatbot';
import Directory from './pages/Directory';
import Registration from './pages/Registration';
import Meditation from './pages/Meditation';
export default function Router() {

    const routes = useRoutes([
        {
            path: '/',
            element: <LandingPage />,
            children: [{ element: <Navigate to="/" replace />, index: true }],
        },
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/dashboard',
            element: <DashboardLayout/> ,
        },
        {
            path: '/directory',
            element: <Directory />,
    
        },
        {
            path: '/meditation',
            element: <Meditation />,
    
        },
        {
            path: '/registration',
            element: <Registration />,
    
        },
        {
            path: '/chatbot',
            element: <Chatbot/>,
        },
        {
            path: '*',
            element: <Navigate to="/404" replace />,
        },
    ]);

    return routes;
}