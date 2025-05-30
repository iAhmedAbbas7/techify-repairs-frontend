import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  // Selecting the Current Token from the Auth State Slice
  const token = useSelector(selectCurrentToken);
  let isAdmin = false;
  let isManager = false;
  let status = "Employee";
  // If Token is Present
  if (token) {
    // Decoding the Token
    const decoded = jwtDecode(token);
    // Destructuring Username & Roles from the Token
    const { username, roles } = decoded.UserInfo;
    // Checking Roles
    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");
    // Setting Status for the Highest Role
    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";
    return { username, roles, status, isManager, isAdmin };
  }
  // Return Statement in Case no Token is Present
  return { username: "", roles: [], isAdmin, isManager, status };
};

export default useAuth;
