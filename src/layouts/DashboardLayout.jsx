import { FaUser } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';
import useUserRole from '../hooks/userRole';
import Sidebar from '../pages/DashBoard/Sidebar/Sibebar';

const DashboardLayout = () => {
  const [role, isRoleLoading] = useUserRole();

  if (isRoleLoading) return <Spinner />;

  const navItemStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-all 
     ${
       isActive
         ? 'bg-primary text-white shadow-md'
         : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
     }`;

  return (
    <div className="drawer lg:drawer-open bg-base-100 min-h-screen">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="lg:hidden navbar bg-base-200 shadow-sm px-4">
          <div className="flex items-center justify-between w-full">
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
            <Link to="/" className="text-lg font-bold text-primary">
              EduManage
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-40">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <aside className="w-72 min-h-full bg-base-200 shadow-md flex flex-col">
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

          {/* Dynamic Sidebar Items */}
          <div className="flex-1 overflow-y-auto">
            <Sidebar />
          </div>

          {/* Always at bottom */}
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
