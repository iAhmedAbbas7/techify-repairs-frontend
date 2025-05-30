import { useState, useEffect, useRef } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";
import useTitle from "../../hooks/useTitle";
import { PulseLoader } from "react-spinners";
import toast from "react-hot-toast";

// USER DATA REGEXES
const USER_REGEX = /^[A-Za-z]{3,20}$/;
const PWD_REGEX = /^[A-Za-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
  // Location & Navigation
  const location = useLocation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // Document Title Hook
  useTitle("Create User");
  // Toast Ref
  const hasShownToast = useRef(false);
  // Using New User Mutation from Users Slice
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();
  // State Management
  const [username, setUsername] = useState(location.state?.username || "");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState(location.state?.password || "");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(location.state?.roles || ["Employee"]);
  // Avatar File Flag
  const initialRestored = !!location.state?.avatarFilename;
  // Getting Initial Avatar File Name From Location State
  const initialAvatar = location.state?.avatarFilename
    ? new File([""], location.state.avatarFilename, { type: "image/*" })
    : null;
  const [avatar, setAvatar] = useState(initialAvatar);
  const [fileRestored, setFileRestored] = useState(initialRestored);
  // Validating Username & Password
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);
  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);
  // Successful Mutation Handling
  useEffect(() => {
    if (isSuccess && !hasShownToast.current) {
      // Toast
      toast.success(`New User ${username} Created Successfully!`, {
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
      // Marking Toast has Shown
      hasShownToast.current = true;
      setUsername(""), setPassword(""), setRoles([]), navigate("/dash/users");
    }
  }, [isSuccess, navigate, username]);
  // Error Handling
  if (isError) {
    navigate("/error", {
      // Passing the Error, Pathname, Document Title, Username, Password & Roles to the Error Component
      state: {
        error,
        pathname,
        title: document.title,
        username,
        password,
        roles,
        avatar,
      },
      replace: true,
    });
    return null;
  }
  // If Loading
  if (isLoading)
    return (
      <section className="h-screen flex items-center justify-center bg-color-LG">
        <PulseLoader color={"#f5cf87"} />
      </section>
    );
  // State Handlers
  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onRolesChanged = (e) => {
    // Forming an Array if Multiple Roles are Selected from the Values
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };
  const onAvatarChanged = (e) => {
    setAvatar(e.target.files[0]);
    setFileRestored(false);
  };
  // Save User Functionality
  const onSaveUserClicked = async (e) => {
    // Preventing Page Refresh
    e.preventDefault();
    // If Not Loading
    // 1: Username & Invalid Username
    // 2: Password & Invalid Password
    if (
      !isLoading &&
      username &&
      !validUsername &&
      password &&
      !validPassword
    ) {
      const errMessage = "Wrong Username & Password Format";
      navigate("/error", {
        // Passing the Error, Pathname, Document Title, Username, Password & Roles to the Error Component
        state: {
          error: errMessage,
          pathname,
          title: document.title,
          username,
          password,
          roles,
          avatar,
        },
        replace: true,
      });
      return;
    }
    // If Not Loading
    // 1: Username but Invalid Username & Password Empty
    // 2: Password but Invalid Password & Username Empty
    else if (
      !isLoading &&
      ((username && !validUsername) || (password && !validPassword))
    ) {
      const errMessage =
        username && !validUsername
          ? "Wrong Username Format & Password is Required"
          : "Wrong Password Format & Username is Required";
      navigate("/error", {
        // Passing the Error, Pathname, Document Title, Username, Password & Roles to the Error Component
        state: {
          error: errMessage,
          pathname,
          title: document.title,
          username,
          password,
          roles,
          avatar,
        },
        replace: true,
      });
      return;
    }
    // In Case Avatar is Provided
    if (avatar) {
      // Creating FormData Instance to Include File in Request Body
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("roles", JSON.stringify(roles));
      formData.append("avatar", avatar);
      await addNewUser(formData);
    }
    // Incase no Avatar is Provided
    else {
      await addNewUser({ username, password, roles });
    }
  };
  // Mapping Over Roles Array
  const options = Object.values(ROLES).map((role) => (
    <option key={role} value={role}>
      {role}
    </option>
  ));
  // Conditional Classes for Content
  const validUserClass =
    username && !validUsername ? "border-2 border-color-R" : "";
  const validPwdClass =
    password && !validPassword ? "border-2 border-color-R" : "";
  const validRolesClass = !roles.length ? "border-2 border-color-R" : "";
  // Setting Content
  const content = (
    <>
      {/* Main Form Wrapper */}
      <section className="col-12 absolute top-[20px] pb-[20px] flex items-center justify-center px-[1rem] sm:px-[2rem]">
        {/* Main Form Element */}
        <form
          className="col-12 flex items-center justify-center flex-col gap-[1rem]"
          onSubmit={onSaveUserClicked}
          encType="multipart/form-data"
          method="post"
          action="/uploads"
        >
          {/* New User Heading Section */}
          <div className="col-md-8 col-12 flex items-center justify-center gap-2 flex-col">
            <h2 className="uppercase text-[2rem] font-bold text-color-DB">
              New User
            </h2>
          </div>
          {/* Username */}
          <div className="col-md-8 col-12 flex items-start justify-center gap-2 flex-col">
            <label
              className="font-bold text-color-DB uppercase"
              htmlFor="username"
            >
              Username : <span className="">(3-20 Letters)</span>
            </label>
            <input
              type="text"
              className={`col-12 text-color-DB p-[0.5rem] outline-none rounded-xl ${validUserClass}`}
              id="username"
              name="username"
              autoComplete="off"
              spellCheck={false}
              value={username}
              onChange={onUsernameChanged}
              placeholder="Username"
            />
          </div>
          {/* Password */}
          <div className="col-md-8 col-12 flex items-start justify-center gap-2 flex-col">
            <label
              className="font-bold text-color-DB uppercase"
              htmlFor="password"
            >
              Password : <span className="">(4-12 Chars Incl. !@#$%)</span>
            </label>
            <input
              type="password"
              className={`col-12 text-color-DB p-[0.5rem] outline-none rounded-xl ${validPwdClass}`}
              id="password"
              name="password"
              value={password}
              onChange={onPasswordChanged}
              placeholder="Password"
            />
          </div>
          {/* Roles */}
          <div className="col-md-8 col-12 flex items-start justify-center gap-2 flex-col">
            <label
              htmlFor="roles"
              className="font-bold text-color-DB uppercase"
            >
              Assigned Roles :
            </label>
            <select
              name="roles"
              id="roles"
              className={`col-12 font-bold text-color-DB p-[0.5rem] outline-none rounded-xl ${validRolesClass} overflow-hidden`}
              multiple={true}
              size="3"
              value={roles}
              onChange={onRolesChanged}
            >
              {options}
            </select>
          </div>
          {/* Avatar */}
          <div className="col-md-8 col-12 flex items-start justify-center gap-2 flex-col">
            <label
              htmlFor="avatar"
              className="font-bold text-color-DB uppercase"
            >
              Avatar:
            </label>
            <input
              type="file"
              id="avatar"
              className={`${avatar ? "text-color-DB" : "text-color-R"}`}
              name="avatar"
              accept="image/*"
              onChange={onAvatarChanged}
            />
            {/* Previous File History */}
            {fileRestored && avatar && (
              <span className="text-[1rem] text-color-DB">
                Previous Selection: {avatar.name}
              </span>
            )}
          </div>
          {/* Save Button */}
          <div className="col-md-8 col-12 flex items-center justify-center gap-2 flex-col">
            <button
              className="col-md-6 col-12 text-color-DB font-bold p-[1rem] outline-none border-none rounded-xl bg-color-Y capitalize"
              title="Save"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </>
  );
  return content;
};

export default NewUserForm;
