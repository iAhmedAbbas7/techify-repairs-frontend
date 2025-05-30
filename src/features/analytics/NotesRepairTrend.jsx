import {
  faArrowRightLong,
  faDotCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const NotesRepairTrend = ({ notesRepTrendData, avgRepairTime }) => {
  // Formatting Data
  const formattedData = notesRepTrendData.map((item) => ({
    date: new Date(item.createdAt).toLocaleDateString(),
    repairTimeDays: Math.round(item.repairTimeDays * 100) / 100,
  }));
  return (
    <div className="col-12 h-[400px] flex items-start justify-center flex-col gap-[2rem]">
      {/* Heading */}
      <div className="col-12 flex items-start justify-center gap-[1rem] text-[1.15rem] sm:text-[1.5rem] uppercase text-color-GR font-bold flex-col">
        <div className="flex items-center justify-start gap-[0.5rem]">
          <FontAwesomeIcon icon={faDotCircle} />
          <span>Notes Repair Time trend :</span>
        </div>
        <div className="text-[0.8rem] italic">
          <FontAwesomeIcon icon={faArrowRightLong} />
          <span className="ms-2">
            Number of Users Currently Logged In with their Login Time
          </span>
        </div>
      </div>
      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={formattedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid />
          <XAxis dataKey="date" stroke="#4c5c75" strokeWidth={2} />
          <YAxis stroke="#4c5c75" strokeWidth={2} allowDecimals={true} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "2px solid #ccc",
              textTransform: "uppercase",
            }}
            formatter={(value) => [`${value} Days`, "Repair Time"]}
          />
          <Line
            type="monotone"
            dataKey="repairTimeDays"
            stroke="#c75c5c"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          {avgRepairTime > 0 && (
            <ReferenceLine
              y={avgRepairTime}
              label={`Avg: ${avgRepairTime}d`}
              stroke="#f5cf87"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NotesRepairTrend;
