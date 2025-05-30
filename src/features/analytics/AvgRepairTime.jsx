import {
  faArrowRightLong,
  faDotCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AvgRepairTime = ({ avgRepairTime }) => {
  return (
    // Main Wrapper
    <div className="col-12 flex items-start justify-center flex-col gap-[4rem]">
      {/* Heading */}
      <div className="col-12 flex items-start justify-center gap-[1rem] text-[1.15rem] sm:text-[1.5rem] uppercase text-color-GR font-bold flex-col">
        <div className="flex items-center justify-start gap-[0.5rem]">
          <FontAwesomeIcon icon={faDotCircle} />
          <span>Average Repair Time :</span>
        </div>
        <div className="text-[0.8rem] italic">
          <FontAwesomeIcon icon={faArrowRightLong} />
          <span className="ms-2">
            Average Repair Time (Comparison of Notes Creation & Completion
            Dates)
          </span>
        </div>
      </div>
      {/* Data */}
      <div className="col-12 flex items-center justify-center">
        <div>
          <span className="sm:text-[200px] text-[135px] text-color-R2 font-bold">
            {avgRepairTime}
          </span>
          <span className="sm:text-[70px] text-[40px] text-color-Y2 font-bold">
            Days
          </span>
        </div>
      </div>
    </div>
  );
};

export default AvgRepairTime;
