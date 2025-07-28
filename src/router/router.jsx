import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home/Home';
import AuthLayOut from '../layouts/AuthLayOut';
import Login from '../pages/Authentication/Login/Login';
import Register from '../pages/Authentication/Register/Register';
import DashboardLayout from '../layouts/DashboardLayout';
import AddClass from '../pages/DashBoard/AddClass';
import MyClass from '../pages/DashBoard/MyClass';
import MyClassDetails from '../pages/DashBoard/MyClassDetails';
import AllClass from '../pages/DashBoard/AllClass';
import TeachOnEduManage from '../pages/TeachOnEduManage/TeachOnEduManage';
import TeacherRequests from '../pages/DashBoard/TecherRequest';
import AllClasses from '../pages/AllClassess/AllClasses';
import ClassDetails from '../pages/AllClassess/ClassDetails';
import PaymentPage from '../pages/PaymentPage/PaymentPage';
import Users from '../pages/DashBoard/Users';
import MyEnrolledClass from '../pages/DashBoard/MyEnrolledClass';
import MyEnrollClassDetails from '../pages/MyEnrollClassDetails/MyEnrollClassDetails';
import MyProfile from '../pages/DashBoard/MyProfile.jsx';
import PrivateRoute from '../routes/PrivateRoute.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: 'TeachOnEduManage',
    element: (
      <PrivateRoute>
        <TeachOnEduManage></TeachOnEduManage>
      </PrivateRoute>
    ),
  },
  {
    path: 'allClasses',
    element: <AllClasses />,
  },
  {
    path: '/class/:id',
    element: <ClassDetails />,
  },

  {
    path: '/class/:id',
    element: <ClassDetails />,
  },

  {
    path: '/payment/:id',
    element: <PaymentPage />,
  },
  {
    path: '/',
    element: <AuthLayOut />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    path: 'dashBoard',
    element: <DashboardLayout />,
    children: [
      {
        path: 'add-class',
        element: <AddClass />,
      },
      {
        path: 'my-class',
        element: <MyClass />,
      },
      {
        path: 'my-class/:id',
        element: <MyClassDetails />,
      },
      {
        path: 'all-classes',
        element: <AllClass />,
      },
      {
        path: 'my-enrolled-classes',
        element: <MyEnrolledClass />,
      },
      {
        path: 'my-enroll-class/:id',
        element: <MyEnrollClassDetails />,
      },

      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'teacher-request',
        element: <TeacherRequests />,
      },
      {
        path: 'my-profile',
        element: <MyProfile />,
      },
    ],
  },
]);
