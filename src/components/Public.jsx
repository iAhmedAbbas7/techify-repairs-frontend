import useTitle from "../hooks/useTitle";
import { Link } from "react-router-dom";
import LOGO from "../assets/images/LOGO.png"

const Public = () => {
  // Document Title Hook
  useTitle("Techify Repairs");
  const content = (
    <>
      {/* Public Main Wrapper */}
      <section className="flex items-center justify-center h-screen bg-color-LG">
        {/* Public Content Wrapper */}
        <section className="col-12 flex items-center justify-center flex-wrap-reverse p-[1.25rem] max-sm:p-0 tracking-[1px]">
          {/* Text Section */}
          <div className="col-lg-6 col-10 flex items-center justify-center flex-col gap-4">
            <div>
              <h1 className="text-color-DB font-extrabold text-[2.25rem] max-md:text-[1.75rem] text-center">
                Welcome to Techify Repairs!
              </h1>
            </div>
            <div>
              <Link
                className="no-underline px-[1.25rem] py-[0.5rem] font-bold text-[1.25rem] text-white bg-color-LB2 hover:bg-color-LB1 rounded-md"
                to="/login"
              >
                Login
              </Link>
            </div>
          </div>
          {/* Image Section */}
          <div className="col-lg-6 col-10 flex items-center justify-center">
            <div>
              <img
                src={LOGO}
                alt=""
                className="img-fluid w-[412px] h-[412px]"
              />
            </div>
          </div>
        </section>
      </section>
    </>
  );
  return content;
};
export default Public;
