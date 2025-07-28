import { FaList, FaPlus, FaUser, FaUserPlus, FaUsers } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const navItemStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-all font-medium
     ${
       isActive
         ? 'bg-primary text-white shadow-md'
         : 'hover:bg-gray-100 text-gray-700 dark:text-gray-300'
     }`;

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-100">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col">
        {/* Mobile navbar */}
        <div className="navbar bg-base-300 lg:hidden shadow-sm">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
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
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="flex-1 text-xl font-semibold px-2">
            🎓 EduManage Dashboard
          </div>
        </div>

        {/* Page content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <aside className="w-80 min-h-full bg-base-200 text-base-content shadow-md">
          <div className="text-center py-6 border-b">
            <h2 className="text-xl font-bold text-primary">EduManage</h2>
            <p className="text-sm text-gray-500">Dashboard Menu</p>
          </div>
          <ul className="menu p-4 space-y-1">
            <NavLink to="/dashboard/add-class" className={navItemStyle}>
              <FaPlus /> Add Class
            </NavLink>

            <NavLink
              to="/dashboard/my-enrolled-classes"
              className={navItemStyle}
            >
              <FaList /> My Enrolled Classes
            </NavLink>

            <NavLink to="/dashboard/teacher-request" className={navItemStyle}>
              <FaUserPlus /> Teacher Request
            </NavLink>

            <NavLink to="/dashboard/my-class" className={navItemStyle}>
              <FaList /> My Class
            </NavLink>

            <NavLink to="/dashboard/users" className={navItemStyle}>
              <FaUsers /> Users
            </NavLink>

            <NavLink to="/dashboard/all-classes" className={navItemStyle}>
              <FaList /> All Classes
            </NavLink>

            <NavLink to="/dashboard/my-profile" className={navItemStyle}>
              <FaUser /> My Profile
            </NavLink>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
