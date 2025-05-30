import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";
const DashLayout = () => {
  return (
    // Dashboard Main Wrapper
    <section className="bg-color-LG h-screen relative flex items-center justify-center flex-col">
      {/* Dashboard Header */}
      <DashHeader />
      {/* Dashboard Routes Wrapper */}
      <div className="col-12 absolute top-[96px] bottom-[40px] left-0 right-0 overflow-y-auto  flex items-center justify-center">
        <Outlet />
      </div>
      {/* Dashboard Footer */}
      <DashFooter />
    </section>
  );
};

export default DashLayout;
