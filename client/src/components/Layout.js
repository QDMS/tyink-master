import React, { useState } from "react";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-smile-fill",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-3-fill",
    },
    {
      name: "Apply Apprenticeship/Tattooist",
      path: "/apply-tattooist",
      icon: "ri-pencil-ruler-2-fill",
    },
    // {
    //   name: "Profile",
    //   path: "/profile",
    //   icon: "ri-user-5-fill",
    // },
  ];

  const tattooistMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-smile-fill",
    },
    {
      name: "Appointments",
      path: "/tattooist/appointments",
      icon: "ri-file-list-2-fill",
    },
    {
      name: "Profile",
      path: `/tattooist/profile/${user?._id}`,
      icon: "ri-user-5-fill",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-smile-fill",
    },
    {
      name: "Clients",
      path: "/admin/clientslist",
      icon: "ri-file-user-fill",
    },
    {
      name: "Tattooist",
      path: "/admin/tattooistlist",
      icon: "ri-quill-pen-fill",
    },
    // {
    //   name: "Profile",
    //   path: "/profile",
    //   icon: "ri-user-5-fill",
    // },
  ];

  const menuToBeRendered = user?.isAdmin
    ? adminMenu
    : user?.isTattooist
    ? tattooistMenu
    : user?.isApprentice
    ? tattooistMenu
    : userMenu;
  const role = user?.isAdmin
    ? "Admin"
    : user?.isTattooist
    ? "Tattooist"
    : user?.isApprentice
    ? "Tattooist"
    : "Client";

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">TYIJ</h1>
            <h1 className="role">{role}</h1>
          </div>

          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className={`d-flex menu-item `}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <i className="ri-logout-circle-fill"></i>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>

        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-3-fill header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            <div className="d-flex align-items-center px-4">
              <Badge
                count={user?.unseenNotifications.length}
                overflowCount={user?.unseenNotifications.length}
                onClick={() => navigate("/notifications")}
              >
                <i className="ri-notification-4-fill header-action-icon px-3"></i>
              </Badge>
              <p className="anchor-profile mx-3" to="/profile">
                {user?.name}
              </p>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
