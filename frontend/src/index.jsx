import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App';
import Login from './pages/Login';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Muro from './pages/Muro';
import Register from './pages/Register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/post/:postId',
    element: <Detail />
  },
  {
    path: '/muro',
    element: <Muro />
  },
  {
    path: '/register',
    element: <Register />
  }
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);