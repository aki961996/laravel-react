import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './views/Login';
import SignUp from './views/SignUp';
import Users from './views/Users';
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
import Dashboard from './views/Dashboard';
import NotFound from './views/NotFound';

const router = createBrowserRouter([

    {
        path: '/',
        element: <DefaultLayout />,
        children: [

            {
                path: '/',
                element: <Navigate to='/users' />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },

            {
                path: '/users',
                element: <Users />
            },

            {
                path: '*',
                element: <NotFound />
            }

        ],
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [

            {
                path: '/login',
                element: <Login />
            },

            {
                path: '/signup',
                element: <SignUp />
            },




        ],
    },

]);


export default router;