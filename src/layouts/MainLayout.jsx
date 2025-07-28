import React from 'react';

import Navbar from '../components/Navbar/Navbar';

import { Outlet } from 'react-router-dom';
import Footer from '../pages/Home/Footer/Footer';

export default function MainLayout() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}
