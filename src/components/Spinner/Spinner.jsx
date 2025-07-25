const Sidebar = ({ isOpen, closeSidebar, role }) => {
  const navItemStyle = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 transition ${
      isActive ? 'bg-gray-300 font-semibold' : ''
    }`;

  const commonLinks = [{ to: '/', icon: <FaHome />, label: 'Home' }];

  const studentLinks = [
    { to: '/dashboard/select-classes', icon: <FaList />, label: 'My Cart' },
    {
      to: '/dashboard/enrolled-classes',
      icon: <FaList />,
      label: 'Enrolled Classes',
    },
    {
      to: '/dashboard/payment-history',
      icon: <FaWallet />,
      label: 'Payment History',
    },
  ];

  const teacherLinks = [
    { to: '/dashboard/add-class', icon: <FaPlus />, label: 'Add Class' },
    { to: '/dashboard/my-classes', icon: <FaList />, label: 'My Classes' },
  ];

  const adminLinks = [
    { to: '/dashboard/manage-users', icon: <FaUsers />, label: 'Manage Users' },
    {
      to: '/dashboard/manage-classes',
      icon: <FaList />,
      label: 'Manage Classes',
    },
  ];

  const getLinksByRole = () => {
    if (role === 'student') return studentLinks;
    if (role === 'teacher') return teacherLinks;
    if (role === 'admin') return adminLinks;
    return [];
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 z-40 w-64 h-full bg-white shadow-md transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}
    >
      <div className="p-4 flex justify-between items-center md:hidden border-b">
        <h2 className="text-xl font-bold">Menu</h2>
        <button onClick={closeSidebar}>✖</button>
      </div>

      <div className="p-4 flex flex-col space-y-2">
        {commonLinks.map((link, i) => (
          <NavLink
            key={i}
            to={link.to}
            className={navItemStyle}
            onClick={closeSidebar}
          >
            {link.icon} {link.label}
          </NavLink>
        ))}
        {getLinksByRole().map((link, i) => (
          <NavLink
            key={i}
            to={link.to}
            className={navItemStyle}
            onClick={closeSidebar}
          >
            {link.icon} {link.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
