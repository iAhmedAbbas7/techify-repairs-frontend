import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import useTitle from "../../hooks/useTitle";
import TICK from "../../assets/images/TICK.png";
import CROSS from "../../assets/images/CROSS.png";
import PROFILE from "../../assets/images/PROFILE.png";
import LOCATION from "../../assets/images/LOCATION.png";
import ERROR from "../../assets/images/ERROR.png";

const UsersNotes = () => {
  // Location
  const location = useLocation();
  // Location State
  const { state } = location || {};
  const user = state?.user;
  const username = user?.username || urlUsername || "Unknown User";
  const prevPath = state?.pathname || `/dash/users/${username}`;
  const prevTitle = state?.title || "User Profile";
  // Getting the Notes Category from the URL Params
  const { notesCategory, username: urlUsername } = useParams();
  // Dynamic Document Title Hook
  useTitle(
    notesCategory === "assignedNotes"
      ? "Assigned Notes"
      : notesCategory === "completedNotes"
      ? "Completed Notes"
      : notesCategory === "pendingNotes"
      ? "Pending Notes"
      : "User Notes"
  );
  // Conditionally Displaying Notes Based on Notes Category
  let notesList;
  if (notesCategory === "assignedNotes") {
    notesList = state?.totalNotesList || [];
  } else if (notesCategory === "completedNotes") {
    notesList = state?.completedNotesList || [];
  } else if (notesCategory === "pendingNotes") {
    notesList = state?.pendingNotesList || [];
  }
  // Navigation
  const navigate = useNavigate();
  // Layout Class
  const layoutClass = notesList?.length
    ? "grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-[1rem] top-[20px] pb-[20px]"
    : "flex items-center justify-center h-full";
  return (
    // Users Notes Main Wrapper
    <section
      className={`col-12 absolute ${layoutClass} px-[1rem] sm:px-[2rem]`}
    >
      {notesList.length ? (
        notesList.map((note) => {
          // Note Created & Updated Dates
          const created = new Date(note.createdAt).toLocaleString("en-US", {
            day: "numeric",
            month: "long",
          });
          const updated = new Date(note.updatedAt).toLocaleString("en-US", {
            day: "numeric",
            month: "long",
          });
          return (
            // Note Main Container
            <section
              key={note._id}
              className="col-12 p-[1rem] rounded-lg shadow-lg bg-[#d7ceb2] flex items-stretch"
            >
              {/* Note Content Container */}
              <section className="col-12 flex items-stretch justify-start flex-col gap-[0.5rem] tracking-[1px]">
                {/* Note Status */}
                <div className="flex items-center justify-end">
                  {note.completed ? (
                    <div className="flex items-center gap-[0.5rem]">
                      <span className="font-bold text-color-R">Status</span>
                      <img
                        src={TICK}
                        alt="Complete"
                        className="img-fluid w-[16px] h-[16px]"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-[0.5rem]">
                      <span className="font-bold text-color-R">Status</span>
                      <img
                        src={CROSS}
                        alt="Incomplete"
                        className="img-fluid w-[16px] h-[16px]"
                      />
                    </div>
                  )}
                </div>
                {/* Note Assigned User */}
                <div className="flex items-center justify-start gap-[1rem]">
                  <img
                    src={note.avatar || PROFILE}
                    alt={note.username || "User Avatar"}
                    className="img-fluid w-[64px] h-[64px] rounded-full"
                  />
                  <span className="text-[1.5rem] text-color-G1 font-bold">
                    {note.username}
                  </span>
                </div>
                {/* Note Title */}
                <div className="flex items-center justify-start gap-[1rem]">
                  <img
                    src={LOCATION}
                    alt="Location"
                    className="img-fluid w-[36px] h-[36px]"
                  />
                  <span className="text-[1.15rem] font-bold text-color-GR">
                    {note.title}
                  </span>
                </div>
                {/* Note Text */}
                <div className="flex items-center justify-start gap-[1rem]">
                  <span className="text-[1rem] text-color-GR text-justify">
                    {note.text}
                  </span>
                </div>
                {/* Note Dates */}
                <span className="font-bold text-color-R">
                  Created : <span className="text-color-GR">{created}</span>
                </span>
                <span className="font-bold text-color-R">
                  Updated : <span className="text-color-GR">{updated}</span>
                </span>
                {/* Edit Button */}
                <button
                  className="col-12 bg-color-LB2 hover:bg-color-LB1 px-[1rem] py-[0.5rem] text-white text-[1rem] font-bold rounded-lg"
                  onClick={() => navigate(`/dash/notes/${note._id}`)}
                  aria-label="Edit User"
                >
                  Edit Note <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </section>
            </section>
          );
        })
      ) : (
        // In Case any Category has No Notes to Display
        <section className="uppercase font-bold text-center text-color-GR text-[1.15rem] tracking-[1px]">
          {notesCategory === "assignedNotes" ? (
            <section className="flex items-center justify-center flex-col gap-[1rem]">
              <img
                src={ERROR}
                alt="Error"
                className="img-fluid w-[74px] h-[74px]"
              />
              <span>No Assigned Notes available to {username}</span>
              <Link
                className="uppercase px-[1rem] py-[0.5rem] font-bold bg-[#f5cf87] text-color-GR rounded-md no-underline"
                to={`/dash/users/${username}`}
                state={{ user, pathname: prevPath, title: prevTitle }}
              >
                Back to {prevTitle}
              </Link>
            </section>
          ) : notesCategory === "completedNotes" ? (
            <section className="flex items-center justify-center flex-col gap-[1rem]">
              <img
                src={ERROR}
                alt="Error"
                className="img-fluid w-[74px] h-[74px]"
              />
              <span>No Completed Notes available to {username}</span>
              <Link
                className="uppercase px-[1rem] py-[0.5rem] font-bold bg-[#f5cf87] text-color-GR rounded-md no-underline"
                to={`/dash/users/${username}`}
                state={{ user, pathname: prevPath, title: prevTitle }}
              >
                Back to {prevTitle}
              </Link>
            </section>
          ) : notesCategory === "pendingNotes" ? (
            <section className="flex items-center justify-center flex-col gap-[1rem]">
              <img
                src={ERROR}
                alt="Error"
                className="img-fluid w-[74px] h-[74px]"
              />
              <span>No Pending Notes available to {username}</span>
              <Link
                className="uppercase px-[1rem] py-[0.5rem] font-bold bg-[#f5cf87] text-color-GR rounded-md no-underline"
                to={`/dash/users/${username}`}
                state={{ user, pathname: prevPath, title: prevTitle }}
              >
                Back to {prevTitle}
              </Link>
            </section>
          ) : (
            ""
          )}
        </section>
      )}
    </section>
  );
};

export default UsersNotes;
