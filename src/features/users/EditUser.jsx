import { useParams } from "react-router-dom";
import { useGetUsersQuery } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";
import { PulseLoader } from "react-spinners";
import useTitle from "../../hooks/useTitle";

const EditUser = () => {
  // Document Title Hook
  useTitle("Edit User");
  // Retrieving ID from URL
  const { id } = useParams();
  // Finding the User from the get Users Query Result
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });
  // If No User Found
  if (!user) return (
      <section className="h-screen flex items-center justify-center bg-color-LG">
        <PulseLoader color={"#f5cf87"} />
      </section>
    );
  // If User Found
  const content = <EditUserForm user={user} />;
  return content;
};

export default EditUser;
