import Users from "./views/Users/Users";
import Role from "./views/Role/Role";
import Items from "./views/Items/Items";
import Dashboard from "./views/Dashboard/Dashboard";
import { Sales } from "./views/Sales/Sales";

const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
    role: ["supervisor", "admin"], // Example of roles allowed to access this route
  },
  {
    path: "/dashboard/users",
    component: Users,
    role: ["admin"],
  },
  {
    path: "/dashboard/items",
    component: Items,
    role: ["supervisor", "admin"],
  },
  {
    path: "/dashboard/sales",
    component: Sales,
    role: ["salesperson", "admin"],
  },
  {
    path: "/dashboard/roles",
    component: Role,
    role: ["admin"],
  },
];

export default routes;
