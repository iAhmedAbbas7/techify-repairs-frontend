import { useRef, useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { PulseLoader } from "react-spinners";
import usePersist from "../../hooks/usePersist";
import useTitle from "../../hooks/useTitle";
import LOGO from "../../assets/images/LOGO.png";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  // Current User Credentials
  const { username: currentUser } = useAuth();
  // Document Title Hook
  useTitle("User Login");
  // Location & Navigation
  const location = useLocation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // References for Component
  const userRef = useRef();
  // Toast Ref
  const hasShownToast = useRef(false);
  // State Management
  const [username, setUsername] = useState(location.state?.username || "");
  const [password, setPassword] = useState(location.state?.password || "");
  const [persist, setPersist] = usePersist();

  // Dispatch
  const dispatch = useDispatch();
  // Using Login Mutation from Auth API Slice
  const [login, { isLoading, isSuccess }] = useLoginMutation();
  // Focusing the Username Input Field
  useEffect(() => {
    userRef.current.focus();
  }, []);
  // State Handlers
  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);
  // Form Submit Functionality
  const handleSubmit = async (e) => {
    // Preventing Page Refresh
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      let errMessage = "";
      if (!err.status) {
        errMessage = "No Server Response";
      } else if (err.status === 400) {
        errMessage = err.data?.message || "Missing Username or Password";
      } else if (err.status === 401) {
        errMessage =
          err.data?.message || "User either does not Exist or has no Access";
      } else {
        errMessage = err.data?.message || "Unknown Error";
      }
      navigate("/error", {
        // Passing the Error, Pathname, Document Title, Username & Password to the Error Component
        state: {
          error: errMessage,
          pathname,
          title: document.title,
          username,
          password,
        },
        replace: true,
      });
      return;
    }
  };
  // Successful Mutation Handling
  useEffect(() => {
    if (isSuccess && !hasShownToast.current) {
      // Toast
      toast.success(`Welcome ${currentUser}!`, {
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
    }
  }, [isSuccess, currentUser]);
  // Loading State
  if (isLoading)
    return (
      <section className="w-screen h-screen flex items-center justify-center bg-color-LG">
        <PulseLoader color={"#f5cf87"} />
      </section>
    );
  // Rendering Content
  const content = (
    <>
      {/* Login Main Wrapper */}
      <section className="bg-color-LG h-screen flex items-center justify-center">
        {/* Header */}
        <header className="fixed top-0 px-[2rem] py-[0.5rem] bg-color-S w-full">
          <Link to="/">
            <img
              src={LOGO}
              alt="Home"
              className="img-fluid sm:w-[74px] sm:h-[74px] w-[64px] h-[64px]"
            />
          </Link>
        </header>
        {/* Main Form Element */}
        <form
          className="col-12 flex items-center justify-center flex-col tracking-[1px] gap-[1rem]"
          onSubmit={handleSubmit}
        >
          {/* Title */}
          <h1 className=" text-[2.25rem] font-extrabold uppercase text-color-DB">
            User Login
          </h1>
          {/* Username */}
          <div className="col-md-8 col-10 flex items-start justify-center gap-2 flex-col">
            <label
              htmlFor="username"
              className="uppercase font-bold text-color-DB"
            >
              Username:
            </label>
            <input
              type="text"
              className="col-12 text-color-DB p-[1rem] outline-none rounded-xl"
              id="username"
              ref={userRef}
              value={username}
              onChange={handleUserInput}
              autoComplete="off"
              spellCheck="false"
              placeholder="Username"
            />
          </div>
          {/* Password */}
          <div className="col-md-8 col-10 flex items-start justify-center gap-2 flex-col">
            <label
              htmlFor="password"
              className="uppercase font-bold text-color-DB"
            >
              Password:
            </label>
            <input
              type="password"
              className="col-12 text-color-DB p-[1rem] outline-none rounded-xl"
              id="password"
              value={password}
              onChange={handlePwdInput}
              placeholder="Password"
            />
          </div>
          {/* Sign In Button */}
          <div className="col-md-8 col-10 flex items-center justify-center">
            <button className="col-md-6 col-12 text-color-DB font-bold p-[1rem] outline-none border-none rounded-xl bg-color-Y capitalize">
              Sign In
            </button>
          </div>
        </form>
        {/* Footer */}
        <footer className="fixed bottom-0 w-full p-[1rem] bg-color-LB2">
          <div className="col-12 flex items-center justify-center gap-4 tracking-[2px]">
            {/* Persist */}
            <label htmlFor="persist" className="uppercase font-bold text-white">
              Privacy & Cookie Policy
            </label>
            <input
              type="checkbox"
              id="persist"
              className="w-6 h-6"
              onChange={handleToggle}
              checked={persist}
            />
          </div>
        </footer>
      </section>
    </>
  );
  return content;
};

export default Login;
