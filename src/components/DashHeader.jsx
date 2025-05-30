import { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";
import LOGO from "../assets/images/LOGO.png";
import LOGOUT from "../assets/images/LOGOUT.png";
import USERS from "../assets/images/USERS.png";
import NOTES from "../assets/images/NOTES.png";
import NOTE from "../assets/images/NOTE.png";
import USER from "../assets/images/USER.png";
import DASHBOARD from "../assets/images/DASHBOARD.png";
import { PulseLoader } from "react-spinners";

// REGEXES
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;
const DASHBOARD_REGEX = /^\/dash\/users\/analytics(\/)?$/;

const DashHeader = () => {
  // Retrieving User Role
  const { isManager, isAdmin } = useAuth();
  // Navigation
  const navigate = useNavigate();
  // Location
  const { pathname } = useLocation();
  // Using Logout Mutation from Auth Api Slice
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();
  // Navigating to Homepage on Successful Logout
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);
  // Navigation Handlers
  const onNewNoteClicked = () => navigate("/dash/notes/new");
  const onNewUserClicked = () => navigate("/dash/users/new");
  const onNotesClicked = () => navigate("/dash/notes");
  const onUsersClicked = () => navigate("/dash/users");
  const onDashboardClicked = () => navigate("/dash/users/analytics");
  // Logout Handler
  const onLogoutClicked = () => sendLogout();
  // Dashboard Button => Rendered only when User is on Route other than Dashboard
  let dashboardButton;
  if (isManager || isAdmin) {
    if (!DASHBOARD_REGEX.test(pathname) && pathname.includes("/dash")) {
      dashboardButton = (
        <button
          className="icon-button"
          title="Dashboard"
          onClick={onDashboardClicked}
        >
          <img
            src={DASHBOARD}
            alt="Dashboard"
            className="img-fluid sm:w-[54px] sm:h-[54px] w-[44px] h-[44px]"
          />
        </button>
      );
    }
  }
  // New Note Button => Rendered only when User is on Notes List Page
  let newNoteButton = null;
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <button
        className="icon-button"
        title="New Note"
        onClick={onNewNoteClicked}
      >
        <img
          src={NOTE}
          alt="New Note"
          className="img-fluid sm:w-[54px] sm:h-[54px] w-[44px] h-[44px]"
        />
      </button>
    );
  }
  // New User Button => Rendered only when User is on Users List Page
  let newUserButton = null;
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button
        className="icon-button"
        title="New User"
        onClick={onNewUserClicked}
      >
        <img
          src={USER}
          alt="New User"
          className="img-fluid sm:w-[54px] sm:h-[54px] w-[44px] h-[44px]"
        />
      </button>
    );
  }
  // Notes List Button
  let notesListButton = null;
  if (!NOTES_REGEX.test(pathname) && pathname.includes("/dash")) {
    notesListButton = (
      <button className="icon-button" title="Notes" onClick={onNotesClicked}>
        <img
          src={NOTES}
          alt="Notes"
          className="img-fluid sm:w-[54px] sm:h-[54px] w-[44px] h-[44px]"
        />
      </button>
    );
  }
  // Users List Button =>
  let usersListButton = null;
  // Rendered When User is Manager or Admin
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
      usersListButton = (
        <button className="icon-button" title="Users" onClick={onUsersClicked}>
          <img
            src={USERS}
            alt="Users"
            className="img-fluid sm:w-[54px] sm:h-[54px] w-[44px] h-[44px]"
          />
        </button>
      );
    }
  }
  // Logout Button
  const logoutButton = (
    <button className="icon-button" title="Logout" onClick={onLogoutClicked}>
      <img
        src={LOGOUT}
        alt="Logout"
        className="img-fluid sm:w-[54px] sm:h-[54px] w-[44px] h-[44px]"
      />
    </button>
  );
  // If Loading
  if (isLoading)
    return (
      <section className="h-screen w-screen flex items-center justify-center bg-color-LG z-[1000]">
        <PulseLoader color={"#f5cf87"} />
      </section>
    );
  // Error Handling
  if (isError) {
    navigate("/error", {
      // Passing the Error, Pathname, Document & Title to the Error Component
      state: {
        error,
        pathname: "/dash",
        title: "Dashboard",
      },
      replace: true,
    });
    return;
  }
  // Conditional Button Rendering
  let buttonContent;
  buttonContent = (
    <>
      {dashboardButton}
      {newNoteButton}
      {newUserButton}
      {notesListButton}
      {usersListButton}
      {logoutButton}
    </>
  );
  const content = (
    <>
      {/* Main Header Wrapper */}
      <header className="fixed top-0 w-full flex items-center justify-between bg-color-G1 px-[1rem] sm:px-[2rem] h-[96px] overflow-hidden z-[1000]">
        {/* Link */}
        <Link to="/dash">
          <img
            src={LOGO}
            alt="Dashboard"
            className="img-fluid sm:w-[74px] sm:h-[74px] w-[64px] h-[64px]"
          />
        </Link>
        {/* Nav Buttons */}
        <nav className="flex items-center justify-center gap-[1rem]">
          {buttonContent}
        </nav>
      </header>
    </>
  );

  return content;
};

export default DashHeader;
