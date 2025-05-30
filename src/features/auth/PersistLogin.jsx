import { Navigate, Outlet, useLocation} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { selectCurrentToken, selectLogoutStatus } from "./authSlice";

const PersistLogin = () => {
  // Getting the Persist Current Value from Local Storage Through the Hook
  const [persist] = usePersist();
  // Getting the Current Access Token from Redux State
  const token = useSelector(selectCurrentToken);
  // Getting the Current Pathname to Check if the Current Pathname is Protected
  const { pathname } = useLocation();
  // Getting the Logout Status from Auth Slice
  const loggedOut = useSelector(selectLogoutStatus);
  // Hook to Control Running Effects in Development
  const effectRan = useRef(false);
  // Flag to Indicate that the Refresh Was Successful
  const [trueSuccess, setTrueSuccess] = useState(false);
  // Using Refresh Mutation from Auth API Slice
  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();
  // Verifying the Refresh Token if Persist is True and Token is Absent
  useEffect(() => {
    // Only Run refresh Logic When:
    // 1. We're in a Protected Route (/dash)
    // 2. Persist is True
    // 3. There is no Token
    // 4. And the user has not Logged Out
    if (
      (effectRan.current === true || import.meta.env.MODE !== "development") &&
      pathname.startsWith("/dash")
    ) {
      const verifyRefreshToken = async () => {
        try {
          // Triggering the Refresh Mutation to get a New Access Token
          await refresh();
          // Local State Flag to Set that the Refresh was Successful and Token is Received
          setTrueSuccess(true);
        } catch (err) {
          console.log(err);
        }
      };
      // Trigger Refresh Only when Token is Empty and Persist is True and the User isn't Logged Out
      if (!token && persist && !loggedOut) verifyRefreshToken();
    }
    // Marking the First Mount has Completed (Preventing Duplicate Calls in Dev Mode)
    return () => (effectRan.current = true);
  }, [persist, refresh, token, pathname, loggedOut]);
  // Conditional Content Rendering
  let content;
  // * 1 => In Case User Logged Out, Refresh Mutation is not Invoked //
  if (loggedOut) {
    console.log("User Logged Out");
    return <Outlet />;
  }
  // * 1 => In Case User has not Persisted Login this will be Returned Immediately //
  else if (!persist) {
    console.log("No Persist");
    content = <Outlet />;
  }
  // * 2 => In Case Token Expired or Page Refreshed, Refresh Mutation is in Loading State //
  else if (isLoading) {
    console.log("Loading");
    content = (
      <div className="h-screen flex items-center justify-center bg-color-LG">
        <PulseLoader color={"#f5cf87"} />
      </div>
    );
  }
  // * 3 => In Case Refresh Token has Expired, Refresh Mutation Returns Error //
  else if (isError) {
    return (
      <Navigate
        to="/error"
        state={{
          error,
          pathname: "/login",
          title: "Login",
        }}
        replace
      />
    );
  }
  // * 4 => In Case Token has been Refreshed Successfully, Refresh Mutation Returns Success, along with Local State Flag (trueSuccess) in verifyRefreshToken() Function //
  else if (isSuccess && trueSuccess) {
    console.log("Success");
    content = <Outlet />;
  }
  // * 5 => In Case the User has just Logged In, Token is Available and Refresh Mutation has not been Triggered (isUninitialized) //
  else if (token && isUninitialized) {
    console.log("Token & Uninitialized");
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
