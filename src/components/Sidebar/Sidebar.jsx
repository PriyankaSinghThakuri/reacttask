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
          <a href="#" className="StoreName">
            E-Commerce
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="/dashboard">
              <CDBSidebarMenuItem icon="chart-pie" id="menuitem">
                Dashboard
              </CDBSidebarMenuItem>
            </NavLink>
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

            <NavLink to="/dashboard/items">
              <CDBSidebarMenuItem icon="tools" id="menuitem">
                Items
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink to="/dashboard/sales">
              <CDBSidebarMenuItem icon="chart-line" id="menuitem">
                Sales
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter>
          {/* <div className="sidebar-footer">
            <CDBSidebarMenu>
              <CDBSidebarContent>
                <NavLink to="/">
                  <CDBSidebarMenuItem icon="question" id="menuitem">
                    Help
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink to="/">
                  <CDBSidebarMenuItem icon="book" id="menuitem">
                    Contact Us
                  </CDBSidebarMenuItem>
                </NavLink>
              </CDBSidebarContent>
            </CDBSidebarMenu>
          </div> */}
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
