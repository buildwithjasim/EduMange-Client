import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home/Home';
import AuthLayOut from '../layouts/AuthLayOut';
import Login from '../pages/Authentication/Login/Login';
import Register from '../pages/Authentication/Register/Register';
import DashboardLayout from '../layouts/DashboardLayout';
import TeacherRequest from '../pages/DashBoard/TeacherRequest';
import AddClass from '../pages/DashBoard/AddClass';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: '/',
    Component: AuthLayOut,
    children: [
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
    ],
  },

  {
    path: 'dashBoard',
    Component: DashboardLayout,
    children: [
      {
        path: 'teacher-request',
        Component: TeacherRequest,
      },
      {
        path: 'add-class',
        Component: AddClass,
      },
    ],
  },
]);
