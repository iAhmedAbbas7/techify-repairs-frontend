import { useParams } from "react-router-dom";
import { useGetNotesQuery } from "./notesApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import EditNoteForm from "./EditNoteForm";
import useAuth from "../../hooks/useAuth";
import { PulseLoader } from "react-spinners";
import useTitle from "../../hooks/useTitle";

const EditNote = () => {
  // Document Title Hook
  useTitle("Edit Note");
  // Retrieving ID from URL
  const { id } = useParams();
  // Retrieving Users Credentials
  const { username, isManager, isAdmin } = useAuth();
  // Selecting the Note through NoteID from the Get Notes Query
  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });
  // Selecting All Users from Get Users Query
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });
  // If No Notes or Users
  if (!note || !users?.length)
    return (
      <section className="h-screen flex items-center justify-center bg-color-LG">
        <PulseLoader color={"#f5cf87"} />
      </section>
    );
  // Setting Role Based Access To Edit Notes
  if (!isManager && !isAdmin) {
    if (note.username !== username) {
      return <p className="errmsg">No Access</p>;
    }
  }
  const content = <EditNoteForm note={note} users={users} />;
  return content;
};

export default EditNote;
