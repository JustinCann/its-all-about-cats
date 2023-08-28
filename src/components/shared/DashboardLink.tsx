import React from "react";
import { NavLink, NavLinkProps, Path } from "react-router-dom";
import { RouteKeys } from "@Constants";

interface DashboardLinkProps extends Omit<NavLinkProps, "to"> {
  to: `${RouteKeys}` | Partial<Path>;
}

const DashboardLink: React.FC<DashboardLinkProps> = (props) => (
  <NavLink
    style={({ isActive }) => ({
      color: "black",
      fontWeight: isActive ? "bold" : "",
      textDecoration: "none",
    })}
    {...props}
  />
);

export default DashboardLink;
