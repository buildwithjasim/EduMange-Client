import { NavLink } from 'react-router-dom';
import { FaList, FaPlus, FaUserPlus, FaUsers } from 'react-icons/fa';
import Spinner from '../../../components/Spinner/Spinner';
import useUserRole from '../../../hooks/userRole';

const Sidebar = () => {
  const [role, isRoleLoading] = useUserRole();

  if (isRoleLoading) return <Spinner />;

  const navItemStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200
     ${
       isActive
         ? 'bg-primary text-white shadow-md'
         : 'text-text dark:text-text/80 hover:bg-primary/10 dark:hover:bg-primary/20'
     }`;

  return (
    <ul className="menu p-4 space-y-2">
      {role === 'student' && (
        <>
          <li className="text-xs font-bold uppercase text-accent/70 mt-4">
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
          <li className="text-xs font-bold uppercase text-accent/70 mt-4">
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
          <li className="text-xs font-bold uppercase text-accent/70 mt-4">
            Admin Panel
          </li>
          <li>
            <NavLink to="/dashboard/teacher-request" className={navItemStyle}>
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
  );
};

export default Sidebar;
