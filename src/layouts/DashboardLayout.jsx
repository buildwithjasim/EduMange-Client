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
         ? 'bg-primary text-background shadow-md'
         : 'text-text dark:text-text hover:bg-primary/10 dark:hover:bg-primary/20'
     }`;

  return (
    <div className="drawer lg:drawer-open bg-background dark:bg-background min-h-screen">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="lg:hidden navbar bg-background dark:bg-background shadow-sm px-4">
          <div className="flex items-center justify-between w-full">
            <label htmlFor="my-drawer-2" className="btn btn-ghost btn-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary"
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
        <aside className="w-72 min-h-full bg-background dark:bg-background shadow-md flex flex-col border-r border-primary/20">
          {/* Sidebar Header */}
          <Link
            to="/"
            className="text-center py-6 border-b border-primary/20 dark:border-accent/30"
          >
            <h2 className="text-2xl font-bold text-primary">EduManage</h2>
            <p className="text-sm text-text/60 dark:text-text/70">
              Dashboard Menu
            </p>
          </Link>

          {/* Dynamic Sidebar Items */}
          <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
            <Sidebar navItemStyle={navItemStyle} />
          </div>

          {/* Always at bottom */}
          <div className="border-t border-primary/20 dark:border-accent/30 p-4">
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
