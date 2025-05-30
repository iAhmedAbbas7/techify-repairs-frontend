import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "./usersApiSlice";
import { memo } from "react";
import AVATAR from "../../assets/images/AVATAR.png";

const User = ({ userId }) => {
  // Selecting the User through UserID from the Get users Query
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });
  // Navigation
  const navigate = useNavigate();
  if (user) {
    // Handle Edit Functionality for User
    const handleEdit = () => navigate(`/dash/users/edit/${userId}`);
    // Retrieving User Roles
    const userRolesString = Array.isArray(user.roles)
      ? user.roles.join(", ")
      : user.roles;
    // User Status Handling
    const userStatus = user.active ? "text-color-G1" : "text-color-R";
    return (
      // User Main Wrapper
      <section className="col-12 p-[1rem] rounded-lg shadow-lg bg-[#d7ceb2] flex items-stretch">
        {/* User Content Wrapper */}
        <section className="col-12 flex items-center justify-start flex-col gap-[1.5rem] tracking-[1px]">
          {/* Avatar */}
          <Link
            to={`/dash/users/${user?.username}`}
            state={{ user }}
            className="flex items-center justify-center rounded-full"
          >
            <img
              src={user?.avatar || AVATAR}
              className="img-fluid w-[74px] h-[74px] rounded-full"
            />
          </Link>
          {/* Username */}
          <div className="flex items-center justify-center">
            <span className="text-[2rem] text-color-G1 font-bold">
              {user.username}
            </span>
          </div>
          {/* User Roles */}
          <div className="flex items-center justify-center">
            <span className="text-color-GR text-[1.25rem] font-bold">
              {userRolesString}
            </span>
          </div>
          {/* User Status */}
          <div className="flex items-center justify-center">
            <span className={`${userStatus} text-[1.15rem] font-bold`}>
              {user.active ? "Active" : "Inactive"}
            </span>
          </div>
          {/* User Edit */}
          <button
            className="col-12 bg-color-LB2 hover:bg-color-LB1  font-bold px-[1rem]
              rounded-lg py-[0.5rem] text-white text-[1rem]"
            onClick={handleEdit}
            aria-label="Edit User"
          >
            Edit User <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </section>
      </section>
    );
  } else return null;
};

const memoizedUser = memo(User);

export default memoizedUser;
