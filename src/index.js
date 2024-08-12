import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ErrorPage from './components/ErrorPage';
import Layout from './components/Layout';
import PropertyDetail from './components/PropertyDetail';
import Login from './components/Login';
import CreateUser from './components/CreateUser';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <LandingPage />
      </Layout>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/property/:id",
    element: (
      <Layout>
        <PropertyDetail />
      </Layout>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/create-user",
    element: (
      <Layout>
        <CreateUser />
      </Layout>
    ),
    errorElement: <ErrorPage />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
