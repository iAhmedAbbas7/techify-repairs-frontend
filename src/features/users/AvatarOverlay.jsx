import { useEffect, useState } from "react";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUpdateUserMutation } from "./usersApiSlice";
import toast from "react-hot-toast";

const AvatarOverlay = ({ user }) => {
  // Hover State
  const [hovered, setHovered] = useState(false);
  // State to Display Avatar
  const [localAvatar, setLocalAvatar] = useState(user?.avatar);
  // Update User Mutation
  const [updateUser] = useUpdateUserMutation();
  // Default Avatar
  const DEFAULT_AVATAR = "http://localhost:3500/uploads/AVATAR.png";
  // Removing Blob URL to Avoid Memory Leaks when Local Avatar is Available on Unmount
  useEffect(() => {
    return () => {
      if (localAvatar) {
        URL.revokeObjectURL(localAvatar);
      }
    };
  }, [localAvatar]);
  // Delete Avatar Functionality
  const onDeleteAvatar = async () => {
    try {
      await updateUser({
        id: user._id,
        username: user.username,
        deleteAvatar: "true",
        active: user.active,
      }).unwrap();
      // Setting Local Avatar to Instantly Display in UI
      setLocalAvatar(DEFAULT_AVATAR);
      // Providing New Avatar to Force Re-Render
      user.avatar = DEFAULT_AVATAR;
      // Toast
      toast.success("Avatar Deleted Successfully!", {
        position: "top-center",
        duration: 6000,
        style: {
          background: "#e4eaf8",
          color: "#00000",
          fontWeight: 500,
          whiteSpace: "nowrap",
        },
        iconTheme: {
          primary: "#2db181",
          secondary: "#fff",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  // Upload Avatar Functionality
  const onAddAvatar = async (e) => {
    // Selecting File to Upload
    const file = e.target.files[0];
    // If No File, Return
    if (!file) return;
    // Setting Form Data to Send File in Request
    const formData = new FormData();
    // Appending User Information to Form Data
    formData.append("id", user._id);
    formData.append("username", user.username);
    formData.append("avatar", file);
    formData.append("active", user.active);
    try {
      // Awaiting Update Response
      const response = await updateUser(formData).unwrap();
      // Creating New Avatar URL
      const newAvatarUrl = response.avatar || URL.createObjectURL(file);
      // Setting Local Avatar to Instantly Display in UI
      setLocalAvatar(newAvatarUrl);
      // Providing New Avatar to Force Re-Render
      user.avatar = newAvatarUrl;
      // Toast
      toast.success("Avatar Uploaded Successfully!", {
        position: "top-center",
        duration: 6000,
        style: {
          background: "#e4eaf8",
          color: "#00000",
          fontWeight: 500,
          whiteSpace: "nowrap",
        },
        iconTheme: {
          primary: "#2db181",
          secondary: "#fff",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="relative rounded-full bg-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Avatar */}
      <img
        src={localAvatar}
        alt={user?.username}
        className="img-fluid sm:w-[124px] sm:h-[124px] w-[94px] h-[94px] rounded-full object-cover"
      />
      {/* Hidden File Input for Avatar Upload */}
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={onAddAvatar}
        className="hidden"
      />
      {/* Displaying on Hover */}
      {hovered && (
        <div className="absolute inset-0 flex items-end justify-center rounded-full bg-black bg-opacity-50 transition duration-200">
          {localAvatar === DEFAULT_AVATAR ? (
            // If Default Avatar, Display Add Avatar
            <label htmlFor="fileInput">
              <FontAwesomeIcon
                icon={faPlus}
                color="#FFF"
                size="xs"
                className="block mb-2 cursor-pointer"
                onClick={onAddAvatar}
              />
            </label>
          ) : (
            // If Custom Avatar, Display Delete Avatar
            <FontAwesomeIcon
              icon={faTrash}
              color="#FFF"
              size="xs"
              className="block mb-2 cursor-pointer"
              onClick={onDeleteAvatar}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AvatarOverlay;
