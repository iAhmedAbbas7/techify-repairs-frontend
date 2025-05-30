import { useNavigate, useLocation } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";
import useTitle from "../hooks/useTitle";

const ErrorWrapper = () => {
  // Document Title Hook
  useTitle("Error");
  // Location & Navigation
  const location = useLocation();
  const navigate = useNavigate();
  // Destructuring the Error, Pathname & Title from the Location State
  const {
    error,
    pathname,
    title,
    username,
    password,
    roles,
    active,
    noteTitle,
    text,
    avatar,
    avatarFilename,
  } = location.state || {};
  // If No Error, Redirect to the Pathname
  if (!error) {
    navigate(pathname, { replace: true });
    // Returning Null to Avoid Rendering
    return null;
  }
  // Rendering the Error Component with Error Data & Navigation Props
  return (
    <ErrorComponent
      error={error}
      pathname={pathname}
      title={title}
      username={username}
      password={password}
      roles={roles}
      active={active}
      noteTitle={noteTitle}
      text={text}
      avatar={avatar}
      avatarFilename={avatarFilename}
    />
  );
};

export default ErrorWrapper;
