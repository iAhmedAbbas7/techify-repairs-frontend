import { Link, useLocation, useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import {
  faList,
  faCircleDot,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetNotesQuery } from "../notes/notesApiSlice";
import AvatarOverlay from "./AvatarOverlay";

const UserProfile = () => {
  // Navigation
  const navigate = useNavigate();
  // Location State
  const { state } = useLocation();
  // Setting User as Location State
  const user = state?.user;
  // Document Title Hook
  useTitle(user ? `${user.username}'s Profile` : "User Profile");
  // Fetching All Notes from the Get Notes Query as Normalized State
  const { data: notesData } = useGetNotesQuery("notesList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  // Total Notes Assigned to the User (Numbers & List)
  let totalNotes = 0;
  let totalNotesList;
  // Notes Completed by the User (Numbers & List)
  let completedNotes = 0;
  let completedNotesList;
  // Incomplete Notes of the User (Numbers & List)
  let pendingNotes = 0;
  let pendingNotesList;
  // If Notes Available
  if (notesData) {
    // Selecting Entities Object from the Normalized State
    const allNotes = Object.values(notesData.entities);
    // Filtering Total Number of Notes Assigned to the User
    const myNotes = allNotes.filter(
      (note) => note.user.toString() === user._id.toString()
    );
    // Setting Total Notes (Numbers & List)
    totalNotes = myNotes.length;
    totalNotesList = allNotes.filter(
      (note) => note.user.toString() === user._id.toString()
    );
    // Setting Notes Completed by the User (Numbers & List)
    completedNotes = myNotes.filter((note) => note.completed).length;
    completedNotesList = myNotes.filter((note) => note.completed);
    // Setting Pending Notes (Numbers & List)
    pendingNotes = myNotes.filter((note) => !note.completed).length;
    pendingNotesList = myNotes.filter((note) => !note.completed);
  }
  // User Roles
  const userRolesString = Array.isArray(user?.roles)
    ? user.roles.join(", ")
    : user.roles;
  return (
    <>
      {/* User Profile Main Wrapper */}
      <section className="col-12 absolute top-[20px] pb-[20px] flex flex-col items-start justify-center px-[1rem] sm:px-[2rem] sm:gap-[2rem] gap-[1.5rem]">
        {/* Profile Information */}
        <div className="col-12 flex items-center justify-start sm:gap-[5rem] gap-[3rem] sm:text-[2.5rem] text-[2rem] font-bold text-color-DB flex-wrap">
          {/* User Avatar */}
          <AvatarOverlay user={user} />
          <div className="flex flex-col items-center justify-center">
            {/* Username */}
            <span className="sm:text-[2.5rem] text-[2rem] font-bold text-color-DB">
              {user ? user.username : "Username"}
            </span>
            {/* Roles */}
            <span className="sm:text-[1.25rem] text-[1rem] font-bold text-color-GR">
              {userRolesString}
            </span>
          </div>
          {/* Edit User */}
          <div className="cursor-pointer hover:scale-110 transition-transform duration-200">
            <FontAwesomeIcon
              onClick={() => navigate(`/dash/users/edit/${user._id}`)}
              icon={faPenToSquare}
              color="#2db181"
              size="sm"
            />
          </div>
        </div>
        {/* Notes Information Heading */}
        <div className="flex items-center justify-center gap-[1rem] text-color-GR font-bold text-[1.5rem]">
          <span>
            {user?.username}
            {"'s"} Notes Statistics
          </span>
          <FontAwesomeIcon icon={faList} size="lg" color="#2db181" />
        </div>
        {/* Assigned Notes */}
        <div className="col-md-5 col-12 flex items-center justify-between text-color-GR font-bold text-[1.25rem]">
          <div className="flex items-center justify-center gap-[1rem]">
            <FontAwesomeIcon icon={faCircleDot} size="lg" color="#2db181" />
            <span>Assigned Notes : </span>
          </div>
          <Link
            to={`/dash/users/${user?.username}/assignedNotes`}
            state={{
              totalNotesList,
              pathname: window.location.pathname,
              title: document.title,
              user,
            }}
            className="text-color-LB1 bg-white rounded-md px-[0.8rem] py-[0.2rem] hover:scale-110 transition-transform duration-200 no-underline"
          >
            {totalNotes}
          </Link>
        </div>
        {/* Completed Notes */}
        <div className="col-md-5 col-12 flex items-center justify-between text-color-GR font-bold text-[1.25rem]">
          <div className="flex items-center justify-center gap-[1rem]">
            <FontAwesomeIcon icon={faCircleDot} size="lg" color="#2db181" />
            <span>Completed Notes : </span>
          </div>
          <Link
            to={`/dash/users/${user?.username}/completedNotes`}
            state={{
              completedNotesList,
              pathname: window.location.pathname,
              title: document.title,
              user,
            }}
            className="text-color-LB1 bg-white rounded-md px-[0.8rem] py-[0.2rem] hover:scale-110 transition-transform duration-200 no-underline"
          >
            {completedNotes}
          </Link>
        </div>
        {/* Pending Notes */}
        <div className="col-md-5 col-12 flex items-center justify-between text-color-GR font-bold text-[1.25rem]">
          <div className="flex items-center justify-center gap-[1rem]">
            <FontAwesomeIcon icon={faCircleDot} size="lg" color="#2db181" />
            <span>Pending Notes : </span>
          </div>
          <Link
            to={`/dash/users/${user?.username}/pendingNotes`}
            state={{
              pendingNotesList,
              pathname: window.location.pathname,
              title: document.title,
              user,
            }}
            className="text-color-LB1 bg-white rounded-md px-[0.8rem] py-[0.2rem] hover:scale-110 transition-transform duration-200 no-underline"
          >
            {pendingNotes}
          </Link>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
