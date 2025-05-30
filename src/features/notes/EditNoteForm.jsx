import { useState, useEffect, useRef } from "react";
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { PulseLoader } from "react-spinners";
import toast from "react-hot-toast";

const EditNoteForm = ({ note, users }) => {
  // Location & Navigation
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // Toast Ref
  const hasShownToast = useRef(false);
  // Getting Current User Roles to Manage Role Based Access
  const { isManager, isAdmin } = useAuth();
  // Using Update & Delete Note Mutations from Notes Slice
  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();
  const [
    deleteNote,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteNoteMutation();
  // Navigation
  // State Management
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [userId, setUserId] = useState(note.user);
  const [completed, setCompleted] = useState(note.completed);
  // Clearing the State on Successful Creation
  useEffect(() => {
    if ((isSuccess || isDelSuccess) && !hasShownToast.current) {
      // Toast
      toast.success(
        isSuccess ? "Note Updated Successfully!" : "Note Deleted Successfully!",
        {
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
        }
      );
      // Marking Toast has Shown
      hasShownToast.current = true;
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/notes");
    }
  }, [isSuccess, isDelSuccess, navigate]);
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
  const onCompletedChanged = () => setCompleted((prev) => !prev);
  // Save Note Functionality
  const onSaveNoteClicked = async (e) => {
    // Preventing Page Refresh
    e.preventDefault();
    if (!isLoading) {
      await updateNote({ id: note.id, user: userId, title, text, completed });
    }
  };
  // Delete Note Functionality
  const onDeleteNoteClicked = async (e) => {
    // Preventing Page Refresh
    e.preventDefault();
    await deleteNote({ id: note.id });
  };
  // Created & Updated Dates
  const created = new Date(note.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(note.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  // Users List
  const usersList = users.map((user) => (
    <option value={user.id} key={user.id}>
      {user.username}
    </option>
  ));
  // Conditional Classes for Content
  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "border-2 border-color-R" : "";
  const validTextClass = !text ? "border-2 border-color-R" : "";
  // Setting Error Content
  const errContent = (error?.data?.message || delError?.data?.message) ?? "";
  // Delete Button => Rendered Only For Manager or Admin
  let deleteButton = null;
  if (isManager || isAdmin) {
    deleteButton = (
      <button
        className="col-6 text-color-DB font-bold p-[1rem] outline-none border-none rounded-xl bg-color-R capitalize"
        title="Delete"
        onClick={onDeleteNoteClicked}
      >
        Delete
      </button>
    );
  }
  // Rendering Content
  const content = (
    <>
      {/* Error Content */}
      <p className={errClass}>{errContent}</p>
      {/* Main Form Wrapper */}
      <section className="col-12 absolute top-[20px] pb-[20px] flex items-center justify-center px-[1rem] sm:px-[2rem]">
        {/* Main Form Element */}
        <form
          className="col-12 flex items-center justify-center flex-col gap-[0.7rem]"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Edit Note Heading Section  */}
          <div className="col-md-8 col-12 flex items-center justify-center gap-2">
            <h2 className="uppercase text-[2rem] font-bold text-color-DB">
              Edit Note <span className="text-color-LB2">#{note.ticket}</span>
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
          {/* Created & Updated Dates */}
          <div className="col-md-8 col-12 flex items-start justify-center gap-2 flex-col">
            <span className="font-bold text-color-R uppercase">
              Created : <span className="text-color-DB">{created}</span>
            </span>
            <span className="font-bold text-color-R uppercase">
              Updated : <span className="text-color-DB">{updated}</span>
            </span>
          </div>
          {/* Completed */}
          <div className="col-md-8 col-12 flex items-center justify-start gap-2">
            <label
              htmlFor="note-completed"
              className="font-bold text-color-DB uppercase"
            >
              Work Completed:
            </label>
            <input
              type="checkbox"
              className="w-6 h-6"
              id="note-completed"
              name="completed"
              value={completed}
              checked={completed}
              onChange={onCompletedChanged}
            />
          </div>
          {/* Save & Delete Buttons */}
          <div className="col-md-8 col-12 flex items-center justify-center gap-2">
            <button
              className={`${
                isManager || isAdmin ? "col-6" : "col-12"
              } font-bold p-[1rem] outline-none border-none bg-color-Y capitalize rounded-xl text-color-DB`}
              title="Save"
              onClick={onSaveNoteClicked}
            >
              Save
            </button>
            {deleteButton}
          </div>
        </form>
      </section>
    </>
  );
  return content;
};

export default EditNoteForm;
