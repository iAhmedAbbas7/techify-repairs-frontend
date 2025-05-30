import { useNavigate } from "react-router-dom";
import ERROR from "../assets/images/ERROR.png";

const ErrorComponent = ({
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
}) => {
  // Navigation
  const navigate = useNavigate();
  // Navigation Handler
  const handleClick = () =>
    navigate(pathname, {
      state: {
        username,
        password,
        roles,
        active,
        noteTitle,
        text,
        avatarFilename: avatar?.name,
      },
    });
  return (
    // Error Component Main Wrapper
    <section className="h-screen col-12 flex flex-col items-center justify-center gap-[1rem] bg-color-LG tracking-[1px]">
      {/* Image */}
      <img src={ERROR} alt="Error" className="img-fluid w-[94px] h-[94px]" />
      {/* Error */}
      <span className="uppercase text-[2rem] text-color-GR font-bold">
        Error
      </span>
      {/* Error Message */}
      <span className="uppercase text-[1.15rem] font-bold text-color-GR">
        {error?.data?.message || error || "Unknown Error"}
      </span>
      {/* Navigating Back to Previous URL */}
      <button
        className="uppercase px-[1rem] py-[0.5rem] font-bold bg-[#f5cf87] text-color-GR rounded-md"
        onClick={handleClick}
      >
        {title ? `Back to ${title}` : "Go Back"}
      </button>
    </section>
  );
};

export default ErrorComponent;
