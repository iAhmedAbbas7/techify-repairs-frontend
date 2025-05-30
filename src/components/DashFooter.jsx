import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import HOME from "../assets/images/HOME.png";
import ACTIVE from "../assets/images/ACTIVE.png";
import STATUS from "../assets/images/STATUS.png";

const DashFooter = () => {
  // Current User Username & Status
  const { username, status } = useAuth();
  // Navigation
  const navigate = useNavigate();
  // Location
  const { pathname } = useLocation();
  // Home Button Functionality
  const onGoHomeClicked = () => navigate("/dash");
  let goHomeButton = null;
  // Showing the Button only when the current Path is not Home or "/dash"
  if (pathname !== "/dash") {
    goHomeButton = (
      <button title="Home" onClick={onGoHomeClicked}>
        <img
          src={HOME}
          alt="Dashboard"
          className="img-fluid w-[24px] h-[24px]"
        />
      </button>
    );
  }
  const content = (
    // Footer Main Wrapper
    <footer className="fixed bottom-0 w-full flex items-center justify-center px-[1rem] sm:px-[2rem] h-[40px] bg-color-S overflow-hidden z-[1000]">
      {/* Footer Content Wrapper */}
      <div className="col-12 flex items-center sm:justify-between justify-center flex-wrap tracking-[1px]">
        {/* Home Button */}
        <div className="sm:flex items-center justify-center hidden">
          {goHomeButton}
        </div>
        {/* User Credentials Section */}
        <div className="flex items-center sm:justify-end justify-center gap-[2rem]">
          {/* Current User */}
          <div className="flex items-center justify-center gap-[1rem]">
            <div>
              <img
                src={ACTIVE}
                alt="User"
                className="img-fluid w-[24px] h-[24px]"
              />
            </div>
            <span className="text-white font-bold">{username}</span>
          </div>
          {/* User Status */}
          <div className="flex items-center justify-center gap-[1rem]">
            <div>
              <img
                src={STATUS}
                alt="Status"
                className="img-fluid w-[24px] h-[24px]"
              />
            </div>
            <span className="text-white font-bold">{status}</span>
          </div>
        </div>
      </div>
    </footer>
  );
  return content;
};

export default DashFooter;
