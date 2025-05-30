import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import TIME from "../../assets/images/TIME.png";
import ARROW from "../../assets/images/ARROW.png";

const Welcome = () => {
  // Document Title Hook
  useTitle("Dashboard");
  // Current User Credentials
  const { username, isManager, isAdmin } = useAuth();
  // Setting Current Data
  const date = new Date();
  // Formatting the Data
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "medium",
  }).format(date);
  const content = (
    // Welcome Page Main Wrapper
    <section className="col-12 absolute flex items-center justify-center flex-col flex-wrap gap-[1.25rem] tracking-[1px] px-[1rem] sm:px-[2rem]">
      {/* Time */}
      <div className="flex items-center justify-center gap-[1rem] flex-wrap">
        <div>
          <img
            src={TIME}
            alt="Login Time"
            className="img-fluid w-[28px] h-[28px]"
          />
        </div>
        <span className="text-color-DB text-[1.25rem] font-bold text-center">
          {today}
        </span>
      </div>
      {/* Username Welcome */}
      <h1 className="text-[2.25rem] font-bold text-color-DB text-center">
        Welcome <span className="text-color-LB1">{username}!</span>
      </h1>
      {/* View Notes */}
      <span>
        <Link
          className="no-underline text-[1.5rem] text-color-DB font-bold"
          to="/dash/notes"
        >
          <span className="flex items-center justify-center gap-[0.5rem]">
            <span>View Notes</span>
            <img src={ARROW} alt="Go" className="img-fluid w-[28px] h-[28px]" />
          </span>
        </Link>
      </span>
      {/* Add New Note */}
      <span>
        <Link
          className="no-underline text-[1.5rem] text-color-DB font-bold"
          to="/dash/notes/new"
        >
          <span className="flex items-center gap-[0.5rem]">
            <span>Add New Note</span>
            <img src={ARROW} alt="Go" className="img-fluid w-[28px] h-[28px]" />
          </span>
        </Link>
      </span>
      {/* View Users */}
      {(isAdmin || isManager) && (
        <span>
          <Link
            className="no-underline text-[1.5rem] text-color-DB font-bold"
            to="/dash/users"
          >
            <span className="flex items-center gap-[0.5rem]">
              <span>View Users</span>
              <img
                src={ARROW}
                alt="Go"
                className="img-fluid w-[28px] h-[28px]"
              />
            </span>
          </Link>
        </span>
      )}
      {/* Add New User */}
      {(isAdmin || isManager) && (
        <span>
          <Link
            className="no-underline text-[1.5rem] text-color-DB font-bold"
            to="/dash/users/new"
          >
            <span className="flex items-center gap-[0.5rem]">
              <span>Add New User</span>
              <img
                src={ARROW}
                alt="Go"
                className="img-fluid w-[28px] h-[28px]"
              />
            </span>
          </Link>
        </span>
      )}
    </section>
  );
  return content;
};

export default Welcome;
