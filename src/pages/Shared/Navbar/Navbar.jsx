import { NavLink, useNavigate } from 'react-router';
import { useContext } from 'react';
// import { AuthContext } from '../context/AuthProvider';
import EduLogo from '../../../assets/edulogo.png';
// import { toast } from 'react-toastify';
const Navbar = () => {
  // const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed!');
    }
  };

  const navItems = (
    <>
      <NavLink to="/" className="btn btn-ghost">
        Home
      </NavLink>
      <NavLink to="/groups" className="btn btn-ghost">
        All Classes
      </NavLink>
      <NavLink to="/groups" className="btn btn-ghost">
        Teach on EduManage
      </NavLink>
      {/* {user && (
        <>
          <NavLink to="/createGroup" className="btn btn-ghost">
            Create Group
          </NavLink>
          <NavLink to="/myGroups" className="btn btn-ghost">
            My Groups
          </NavLink>
        </>
      )} */}
    </>
  );

  return (
    <div className="bg-base-200 shadow-md">
      <div className="navbar w-full mx-auto flex justify-around">
        {/* Logo */}

        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {' '}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{' '}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          <div className="flex gap-3">
            <img
              src={EduLogo}
              alt="EduManage Logo"
              className="h-10 w-10 rounded-full "
            />
            <a className="btn btn-ghost text-xl font-bold">EduManage</a>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 ">
          <div className="hidden md:flex gap-2">{navItems}</div>

          {/* User Section */}
          {/* {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                className="avatar tooltip"
                data-tooltip-id="user-tooltip"
              >
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 cursor-pointer">
                  <img src={user.photoURL} alt="User Avatar" />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52"
              >
                <li>
                  <Tooltip id="user-tooltip">{user.displayName}</Tooltip>
                  <button>Dashboard</button>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink to="/login" className="btn btn-primary">
              Login
            </NavLink>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
