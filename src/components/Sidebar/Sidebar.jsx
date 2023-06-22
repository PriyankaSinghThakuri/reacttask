import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  //get role from local storage
  const role = localStorage.getItem("role");
  console.log(role);

  const handlelogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "scroll initial",
        position: "fixed",
        zIndex: "1",
      }}
      className="sidebar-container"
    >
      <CDBSidebar className="sidebar">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <NavLink href="#" className="StoreName">
            GadgetByte
          </NavLink>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            {
              //if role is supervisor then show the menu item
              <>
                <NavLink to="/dashboard">
                  <CDBSidebarMenuItem icon="chart-pie" id="menuitem">
                    Dashboard
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink to="/dashboard/items">
                  <CDBSidebarMenuItem icon="tools" id="menuitem">
                    Items
                  </CDBSidebarMenuItem>
                </NavLink>
              </>
            }
            <NavLink to="/dashboard/users">
              <CDBSidebarMenuItem icon="user" id="menuitem">
                Users
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/dashboard/roles">
              <CDBSidebarMenuItem icon="users" id="menuitem">
                Roles
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink to="/dashboard/sales">
              <CDBSidebarMenuItem icon="chart-line" id="menuitem">
                Sales
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink onClick={handlelogout}>
              <CDBSidebarMenuItem icon="sign-out-alt" id="menuitem">
                LogOut
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
