import { useNavigate } from "react-router-dom";
import { useGetNotesQuery } from "./notesApiSlice";
import { memo } from "react";
import TICK from "../../assets/images/TICK.png";
import CROSS from "../../assets/images/CROSS.png";
import PROFILE from "../../assets/images/PROFILE.png";
import LOCATION from "../../assets/images/LOCATION.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const Note = ({ noteId }) => {
  // Selecting the Note through NoteID from the Get Notes Query
  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId],
    }),
  });
  // Navigation
  const navigate = useNavigate();
  if (note) {
    // Handle Edit Functionality for Note
    const handleEdit = () => navigate(`/dash/notes/${noteId}`);
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
      <section className="col-12 p-[1rem] rounded-lg shadow-lg bg-[#d7ceb2] flex items-stretch">
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
            onClick={handleEdit}
            aria-label="Edit User"
          >
            Edit Note <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </section>
      </section>
    );
  } else return null;
};

const memoizedNote = memo(Note);

export default memoizedNote;
