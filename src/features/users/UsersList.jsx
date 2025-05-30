import { useGetUsersQuery } from "./usersApiSlice";
import { PulseLoader } from "react-spinners";
import User from "./User";
import useTitle from "../../hooks/useTitle";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  // Document Title Hook
  useTitle("Users");
  // Navigation
  const navigate = useNavigate();
  // Fetching Users
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
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
            : "/dash/users/new",
        title:
          error?.data?.message === "Your Login Session has Expired"
            ? "Login"
            : "Create User",
      },
      replace: true,
    });
    return null;
  }
  if (isSuccess) {
    // Destructuring "ids" from the Normalized Data Returned by the Query Function
    const { ids } = users;
    // Conditionally Rendering Users Content
    content = (
      // Main Users List Wrapper
      <section className="col-12 absolute top-[20px] pb-[20px] grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-[1rem] px-[1rem] sm:px-[2rem]">
        {/* Individual Users */}
        {ids?.length &&
          ids.map((userId) => <User key={userId} userId={userId} />)}
      </section>
    );
  }
  return content;
};

export default UsersList;
