import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";
import useAuth from "../../hooks/useAuth";
import { PulseLoader } from "react-spinners";
import useTitle from "../../hooks/useTitle";
import { Link, useNavigate } from "react-router-dom";
import ERROR from "../../assets/images/ERROR.png";

const NotesList = () => {
  // Current User Credentials
  const { username } = useAuth();
  // Document Title Hook
  useTitle("Notes");
  // Navigation
  const navigate = useNavigate();
  // Current User Credentials
  const { isManager, isAdmin } = useAuth();
  // Fetching Notes
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery("notesList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  // Content Rendering
  let content;
  if (isLoading)
    content = (
      <section className="h-screen flex items-center justify-center bg-color-LG">
        <PulseLoader color={"#f5cf87"} />
      </section>
    );
  // Error Handling
  if (isError) {
    navigate("/error", {
      // Passing the Error, Pathname & Title to the Error Component
      state: {
        error:
          error?.data?.message === "read ECONNRESET"
            ? "Network Connectivity Issues"
            : error?.data?.message ===
              "getaddrinfo ENOTFOUND cluster0-shard-00-00.esjbr.mongodb.net"
            ? "Network Connectivity Issues"
            : error,
        pathname:
          error?.data?.message === "Your Login Session has Expired"
            ? "/login"
            : isManager || isAdmin
            ? "/dash/notes/new"
            : "/dash",
        title:
          error?.data?.message === "Your Login Session has Expired"
            ? "Login"
            : isManager || isAdmin
            ? "Create Note"
            : "Dashboard",
      },
      replace: true,
    });
    return null;
  }
  // Success Mutation Handling
  if (isSuccess) {
    // Destructuring "ids" from the Normalized Data Returned by the Query Function
    const { ids } = notes;
    // Layout Class
    const layoutClass = ids?.length
      ? "grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-[1rem] top-[20px] pb-[20px]"
      : "flex items-center justify-center h-full";
    content = (
      // Main Notes List Wrapper
      <section
        className={`col-12 absolute ${layoutClass} px-[1rem] sm:px-[2rem]`}
      >
        {/* Individual Notes */}
        {ids?.length ? (
          ids.map((noteId) => <Note key={noteId} noteId={noteId} />)
        ) : (
          // If No Notes Available
          <section className="uppercase font-bold text-center text-color-GR text-[1.15rem] tracking-[1px]">
            <section className="flex items-center justify-center flex-col gap-[1rem]">
              <img
                src={ERROR}
                alt="Error"
                className="img-fluid w-[74px] h-[74px]"
              />
              <span>No Assigned Notes available to {username}</span>
              <Link
                className="uppercase px-[1rem] py-[0.5rem] font-bold bg-[#f5cf87] text-color-GR rounded-md no-underline"
                to="/dash"
              >
                Back to Dashboard
              </Link>
            </section>
          </section>
        )}
      </section>
    );
  }
  return content;
};

export default NotesList;
