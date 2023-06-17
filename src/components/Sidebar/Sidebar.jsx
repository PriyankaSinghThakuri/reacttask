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
      }}
      className="sidebar-container"
    >
      <CDBSidebar className="sidebar">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="StoreName">
            The Gadget Zone
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="/">
              <CDBSidebarMenuItem icon="home" id="menuitem">
                Dashboard
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="profile">
              <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="customers">
              <CDBSidebarMenuItem icon="user">Customers</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="customers">
              <CDBSidebarMenuItem icon="chart-line">
                Customers
              </CDBSidebarMenuItem>
            </NavLink>
      
              <NavLink to="signin">
                <CDBSidebarMenuItem icon="user" id="menuitem">
                  login
                </CDBSidebarMenuItem>
              </NavLink>
       
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter>
          <div className="sidebar-footer">
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
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
