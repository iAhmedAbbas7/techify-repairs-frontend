import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddNewNoteMutation } from "./notesApiSlice";
import { PulseLoader } from "react-spinners";
import toast from "react-hot-toast";

const NewNoteForm = ({ users }) => {
  // Location & Navigation
  const location = useLocation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // Toast Ref
  const hasShownToast = useRef(false);
  // Using New Note Mutation from Notes Slice
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();
  // State Management
  const [title, setTitle] = useState(location.state?.noteTitle || "");
  const [text, setText] = useState(location.state?.text || "");
  const [userId, setUserId] = useState(users[0].id);
  // Successful Mutation Handling
  useEffect(() => {
    if (isSuccess && !hasShownToast.current) {
      // Toast
      toast.success("New Note Created Successfully!", {
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
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);
  // Error Handling
  if (isError) {
    navigate("/error", {
      // Passing the Error, Pathname, Document, Title & Text to the Error Component
      state: { error, pathname, title: document.title, noteTitle: title, text },
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
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onUserIdChanged = (e) => setUserId(e.target.value);
  // Save Note Functionality
  const onSaveNoteClicked = async (e) => {
    // Preventing Page Refresh
    e.preventDefault();
    if (!isLoading) {
      await addNewNote({ title, text, user: userId });
    }
  };
  // Users List
  const usersList = users.map((user) => (
    <option value={user.id} key={user.id}>
      {user.username}
    </option>
  ));
  // Conditional Classes for Content
  const validTitleClass = !title ? "border-2 border-color-R" : "";
  const validTextClass = !text ? "border-2 border-color-R" : "";
  // Rendering Content
  const content = (
    <>
      {/* Main Form Wrapper */}
      <section className="col-12 absolute top-[20px] pb-[20px] flex items-center justify-center px-[1rem] sm:px-[2rem]">
        {/* Main Form Element */}
        <form
          className="col-12 flex items-center justify-center flex-col gap-[0.7rem]"
          onSubmit={onSaveNoteClicked}
        >
          {/* New Note Heading Section */}
          <div className="col-md-8 col-12 flex items-center justify-center gap-2 flex-col">
            <h2 className="uppercase text-[2rem] font-bold text-color-DB">
              New Note
            </h2>
          </div>
          {/* Title */}
          <div className="col-md-8 col-12 flex items-start justify-center gap-2 flex-col">
            <label
              htmlFor="title"
              className="font-bold text-color-DB uppercase"
            >
              Title :
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className={`col-12 text-color-DB p-[0.5rem] outline-none rounded-xl ${validTitleClass}`}
              autoComplete="off"
              spellCheck={false}
              value={title}
              onChange={onTitleChanged}
              placeholder="Title"
            />
          </div>
          {/* Text */}
          <div className="col-md-8 col-12 flex items-start justify-center gap-2 flex-col">
            <label htmlFor="text" className="font-bold text-color-DB uppercase">
              Text :
            </label>
            <textarea
              type="text"
              id="text"
              name="text"
              className={`col-12 text-color-DB p-[0.5rem] outline-none rounded-xl ${validTextClass}`}
              value={text}
              onChange={onTextChanged}
              placeholder="Text"
            />
          </div>
          {/* User */}
          <div className="col-md-8 col-12 flex items-start justify-center gap-2 flex-col">
            <label
              htmlFor="username"
              className="font-bold text-color-DB uppercase"
            >
              Assigned To :
            </label>
            <select
              id="username"
              name="username"
              value={userId}
              onChange={onUserIdChanged}
              className={`col-12 text-color-DB p-[0.5rem] outline-none`}
            >
              {usersList}
            </select>
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

export default NewNoteForm;
