import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import EduLogo from '../../assets/Brands/eduLogo.png';
import AuthContext from '../../contexts/AuthContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#a138db', // primary
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
    }).then(result => {
      if (result.isConfirmed) {
        logout()
          .then(() => {
            Swal.fire({
              title: 'Logged Out!',
              text: 'You have been successfully logged out.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
            });
            navigate('/');
          })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.message,
            });
          });
      }
    });
  };

  const navItems = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `btn btn-ghost text-text hover:text-primary ${
            isActive ? 'bg-white text-primary font-semibold' : ''
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/allClasses"
        className={({ isActive }) =>
          `btn btn-ghost text-text hover:text-primary ${
            isActive ? 'text-primary font-semibold' : ''
          }`
        }
      >
        All Classes
      </NavLink>
      <NavLink
        to="/TeachOnEduManage"
        className={({ isActive }) =>
          `btn btn-ghost text-text hover:text-primary ${
            isActive ? 'text-primary font-semibold' : ''
          }`
        }
      >
        Teach on EduManage
      </NavLink>
    </>
  );

  return (
    <header className="bg-primary dark:bg-background shadow-md transition-colors duration-300 sticky top-0 z-50">
      <div className="navbar w-full max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo & Mobile Menu */}
        <div className="flex items-center gap-3">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-text"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-background dark:bg-background text-text rounded-box mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          <img
            src={EduLogo}
            alt="EduManage Logo"
            className="h-10 w-10 rounded-full"
          />
          <span className="text-xl font-bold text-text dark:text-text">
            EduManage
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4 items-center">{navItems}</div>

        {/* User Section & Theme Toggle */}
        <div className="flex items-center gap-3">
          {!user ? (
            <Link
              to="/login"
              className="btn btn-outline btn-sm border-primary text-black  hover:text-primary transition-colors duration-300"
            >
              Sign In
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-2 overflow-hidden">
                  <img
                    src={user?.photoURL || '/default-avatar.png'}
                    alt="avatar"
                    className="object-cover w-full h-full"
                  />
                </div>
              </label>
              <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-background dark:bg-background text-text rounded-box w-52">
                <li>
                  <span className="font-semibold">{user.displayName}</span>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
