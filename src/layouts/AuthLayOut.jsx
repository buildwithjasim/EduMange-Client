import React from 'react';
import { Outlet } from 'react-router';

export default function AuthLayOut() {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
}
