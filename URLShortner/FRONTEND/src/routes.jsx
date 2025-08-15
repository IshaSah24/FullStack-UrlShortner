// src/routes.jsx
import './index.css';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  useNavigate,
} from '@tanstack/react-router';

import HomePage from './pages/HomePage';
import AuthForm from './pages/AuthForm';
import { useEffect } from 'react';

import { injectNavigation } from './utils/axiosInstance';

const RootComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    injectNavigation(navigate);
  }, [navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
};


const RootRoute = createRootRoute({
  component: RootComponent,
});

const authRoute = createRoute({
  path: '/auth',
  getParentRoute: () => RootRoute,
  component: AuthForm,
});

const homeRoute = createRoute({
  path: '/',
  getParentRoute: () => RootRoute,
  component: HomePage,
});

const routeTree = RootRoute.addChildren([homeRoute, authRoute]);

export const router = createRouter({ routeTree });
