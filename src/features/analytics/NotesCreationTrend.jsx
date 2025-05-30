import {
  faArrowRightLong,
  faDotCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const NotesCreationTrend = ({ notesCrTrendData }) => {
  // Formatting Data
  const formattedData = notesCrTrendData.map((item) => ({
    date: item._id,
    count: item.count,
  }));
  return (
    <div className="col-12 h-[400px] flex items-start justify-center flex-col gap-[2rem]">
      {/* Heading */}
      <div className="col-12 flex items-start justify-center gap-[1rem] text-[1.15rem] sm:text-[1.5rem] uppercase text-color-GR font-bold flex-col">
        <div className="flex items-center justify-start gap-[0.5rem]">
          <FontAwesomeIcon icon={faDotCircle} />
          <span>
            Notes Creation Trend :{" "}
            <span className="px-[1rem] py-[0.2rem] bg-white rounded-lg text-color-GR">
              7 Days
            </span>
          </span>
        </div>
        <div className="text-[0.8rem] italic">
          <FontAwesomeIcon icon={faArrowRightLong} />
          <span className="ms-2">Number of Notes Created in Each Day</span>
        </div>
      </div>
      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={formattedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid />
          <XAxis dataKey="date" stroke="#4c5c75" strokeWidth={2} />
          <YAxis stroke="#4c5c75" strokeWidth={2} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "2px solid #ccc",
              textTransform: "uppercase",
            }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#f5cf87"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NotesCreationTrend;
