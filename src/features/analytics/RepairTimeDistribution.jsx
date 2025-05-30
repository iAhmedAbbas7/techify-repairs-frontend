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

const RepairTimeDistribution = ({ repairTimeData }) => {
  // Converting Bucket Time from Minutes to Days
  const getBucketLabel = (minutes) => {
    switch (minutes) {
      case 0:
        return "0-2 Days";
      case 2880:
        return "2-5 Days";
      case 7200:
        return "5-10 Days";
      case 14400:
        return "10+ Days";
      default:
        return "14 Days+";
    }
  };
  // Formatting Data
  const formattedData = repairTimeData.map((item) => ({
    range: getBucketLabel(item._id),
    count: item.count,
  }));
  return (
    <div className="col-12 h-[400px] flex items-start justify-center flex-col gap-[2rem]">
      {/* Heading */}
      <div className="col-12 flex items-start justify-center gap-[1rem] text-[1.15rem] sm:text-[1.5rem] uppercase text-color-GR font-bold flex-col">
        <div className="flex items-center justify-start gap-[0.5rem]">
          <FontAwesomeIcon icon={faDotCircle} />
          <span>Repair Time Distribution :</span>
        </div>
        <div className="text-[0.8rem] italic">
          <FontAwesomeIcon icon={faArrowRightLong} />
          <span className="ms-2">
            Bucket Time Comparisons between Repairs (Days)
          </span>
        </div>
      </div>
      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={formattedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid />
          <XAxis dataKey="range" stroke="#4c5c75" strokeWidth={2} />
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
            stroke="#c75c5c"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RepairTimeDistribution;
