import {
  faArrowRightLong,
  faDotCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const EmployeePerformance = ({ performanceData }) => {
  return (
    <div className="col-12 h-[400px] flex items-start justify-center flex-col gap-[2rem]">
      {/* Heading */}
      <div className="col-12 flex items-start justify-center gap-[1rem] text-[1.15rem] sm:text-[1.5rem] uppercase text-color-GR font-bold flex-col">
        <div className="flex items-center justify-start gap-[0.5rem]">
          <FontAwesomeIcon icon={faDotCircle} />
          <span>
            Users Performance :{" "}
            <span className="px-[1rem] py-[0.2rem] bg-white rounded-lg text-color-GR">
              7 Days
            </span>
          </span>
        </div>
        <div className="text-[0.8rem] italic">
          <FontAwesomeIcon icon={faArrowRightLong} />
          <span className="ms-2">Number of Notes Completed by each User</span>
        </div>
      </div>
      {/* Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={performanceData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid />
          <XAxis dataKey="username" stroke="#4c5c75" strokeWidth={2} />
          <YAxis stroke="#4c5c75" strokeWidth={2} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "2px solid #ccc",
              textTransform: "uppercase",
            }}
            formatter={(value) => [`${value}`, "Completed"]}
          />
          <Legend />
          <Bar
            dataKey="completedCount"
            fill="#f5cf87"
            name="Completed Repairs"
            barSize={50}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmployeePerformance;
