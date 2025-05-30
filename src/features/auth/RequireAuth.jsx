import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectLogoutStatus } from "./authSlice";

const RequireAuth = ({ allowedRoles }) => {
  // Getting the Assigned Roles of the Current User
  const { roles } = useAuth();
  // Getting the Logout Status from Auth Slice
  const loggedOut = useSelector(selectLogoutStatus);
  // Location
  const location = useLocation();
  // Setting the Role Based Authorization Flag to Access Protected Routes
  const isAuthorized = roles.some((role) => allowedRoles.includes(role));
  // Conditional Navigation Based on Roles
  if (!isAuthorized) {
    // If a Logged In User Tries to Access Protected Routes
    if (location.pathname.startsWith("/dash/users") && loggedOut !== true) {
      return (
        <Navigate
          to="/error"
          state={{
            error: "You don't have Permission to Access this Page",
            pathname: "/dash",
            title: "Dashboard",
          }}
          replace
        />
      );
    }
    // If User Tries to Access Protected Routes Without Log In
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  // If is Authorized Returning Outlet
  return <Outlet />;
};

export default RequireAuth;
