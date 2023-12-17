import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";

const LoginButton = ({ tag }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    !isAuthenticated && (
      <NavLink
        tag={tag}
        className="text-dark"
        onClick={() => loginWithRedirect()}
      >
        Log In
      </NavLink>
    )
  );
};

export default LoginButton;
