import { PulseLoader } from "react-spinners";
import { useGetUsersQuery } from "../users/usersApiSlice";
import NewNoteForm from "./NewNoteForm";
import useTitle from "../../hooks/useTitle";

const NewNote = () => {
  // Document Title Hook
  useTitle("Create Note");
  // Selecting All Users from Get Users Query
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });
  // If No Users Available
  if (!users?.length) return (
    <section className="h-screen flex items-center justify-center bg-color-LG">
      <PulseLoader color={"#f5cf87"} />
    </section>
  );
  // If Users Found
  const content = <NewNoteForm users={users} />;
  return content;
};

export default NewNote;
