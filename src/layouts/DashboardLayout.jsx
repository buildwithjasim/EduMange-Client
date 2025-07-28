import { FaList, FaPlus, FaUser, FaUserPlus, FaUsers } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router-dom';

import Spinner from '../components/Spinner/Spinner';
import useUserRole from '../hooks/userRole';

const DashboardLayout = () => {
  const [role, isRoleLoading] = useUserRole();

  if (isRoleLoading) return <Spinner />;

  const navItemStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all 
     ${
       isActive
         ? 'bg-primary text-white shadow'
         : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
     }`;

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-100">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Top Navbar */}
        <div className="navbar bg-base-200 lg:hidden shadow-md px-4">
          <div className="flex-1">
            <label htmlFor="my-drawer-2" className="btn btn-ghost btn-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <span className="text-lg font-semibold ml-2">🎓 EduManage</span>
          </div>
        </div>

        {/* Dynamic Outlet Page */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-40">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <aside className="w-72 min-h-full bg-base-200 text-base-content shadow-md flex flex-col">
          {/* Sidebar Header */}
          <Link
            to="/"
            className="text-center py-6 border-b border-gray-300 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-primary">EduManage</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Dashboard Menu
            </p>
          </Link>

          {/* Sidebar Menu */}
          <ul className="menu p-4 space-y-2 flex-grow overflow-y-auto">
            {role === 'student' && (
              <>
                <li className="text-xs font-semibold text-gray-500 uppercase mt-2">
                  Student Panel
                </li>
                <li>
                  <NavLink
                    to="/dashboard/my-enrolled-classes"
                    className={navItemStyle}
                  >
                    <FaList /> My Enrolled Classes
                  </NavLink>
                </li>
              </>
            )}

            {role === 'teacher' && (
              <>
                <li className="text-xs font-semibold text-gray-500 uppercase mt-2">
                  Teacher Panel
                </li>
                <li>
                  <NavLink to="/dashboard/add-class" className={navItemStyle}>
                    <FaPlus /> Add Class
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/my-class" className={navItemStyle}>
                    <FaList /> My Class
                  </NavLink>
                </li>
              </>
            )}

            {role === 'admin' && (
              <>
                <li className="text-xs font-semibold text-gray-500 uppercase mt-2">
                  Admin Panel
                </li>
                <li>
                  <NavLink
                    to="/dashboard/teacher-request"
                    className={navItemStyle}
                  >
                    <FaUserPlus /> Teacher Request
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/users" className={navItemStyle}>
                    <FaUsers /> Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/all-classes" className={navItemStyle}>
                    <FaList /> All Classes
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Profile (Always Bottom) */}
          <div className="border-t p-4">
            <NavLink to="/dashboard/my-profile" className={navItemStyle}>
              <FaUser /> My Profile
            </NavLink>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
