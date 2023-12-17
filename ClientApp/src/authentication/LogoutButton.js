import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";

const LogoutButton = ({ tag }) => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <NavLink
        tag={tag}
        className="text-dark"
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log Out
      </NavLink>
    )
  );
};

export default LogoutButton;
