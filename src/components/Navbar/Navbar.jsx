import { useContext } from 'react';
import EduLogo from '../../assets/Brands/eduLogo.png';
import Swal from 'sweetalert2';
import AuthContext from '../../contexts/AuthContext';
import { Link, Navigate, NavLink } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
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
            <Navigate to="/"></Navigate>;
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
      <NavLink to="/" className="btn btn-ghost">
        Home
      </NavLink>
      <NavLink to="/allClasses" className="btn btn-ghost">
        All Classes
      </NavLink>
      <NavLink to="/TeachOnEduManage" className="btn btn-ghost">
        Teach on EduManage
      </NavLink>
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
          <div className="navbar-end">
            {!user ? (
              <Link to="/login" className="btn btn-outline btn-sm">
                Sign In
              </Link>
            ) : (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full ring ring-primary ring-offset-2">
                    <img
                      src={user.photoURL || '/default-avatar.png'}
                      alt="avatar"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
