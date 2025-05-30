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

const UserStatsChart = ({ userNotesStats }) => {
  return (
    <div className="col-12 h-[400px] flex items-start justify-center flex-col gap-[2rem]">
      {/* Heading */}
      <div className="col-12 flex items-start justify-center gap-[1rem] text-[1.15rem] sm:text-[1.5rem] uppercase text-color-GR font-bold flex-col">
        <div className="flex items-center justify-start gap-[0.5rem]">
          <FontAwesomeIcon icon={faDotCircle} />
          <span>
            Users Notes Stats :{" "}
            <span className="px-[1rem] py-[0.2rem] bg-white rounded-lg text-color-GR">
              7 Days
            </span>
          </span>
        </div>
        <div className="text-[0.8rem] italic">
          <FontAwesomeIcon icon={faArrowRightLong} />
          <span className="ms-2">
            Repaired & Pending Notes Comparison between Users
          </span>
        </div>
      </div>
      {/* Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={userNotesStats}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid />
          <XAxis dataKey="username" stroke="#4c5c75" strokeWidth={2} />
          <YAxis stroke="#4c5c75" strokeWidth={2} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "2px solid #ccc",
              textTransform: "uppercase",
            }}
          />
          <Legend />
          {/* Stacked Bars: completedCount and pendingCount */}
          <Bar
            dataKey="completedCount"
            stackId="a"
            fill="#f5cf87"
            name="Completed"
          />
          <Bar
            dataKey="pendingCount"
            stackId="a"
            fill="#c75c5c"
            name="Pending"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserStatsChart;
