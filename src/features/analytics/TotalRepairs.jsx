import {
  faArrowRightLong,
  faDotCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const TotalRepairs = ({ totalRepairs, totalNotes }) => {
  // Calculating the Number of Pending Notes
  const pendingNotes = totalNotes - totalRepairs;
  // Creating Data Array for the Pie Chart
  const data = [
    { name: "Repaired", value: totalRepairs },
    { name: "Pending", value: pendingNotes },
  ];
  // Colors for Pie Chart
  const COLORS = ["#f5cf87", "#c75c5c"];

  return (
    // Main Wrapper
    <div className="col-12 h-[400px] flex items-start justify-center flex-col gap-[2rem]">
      {/* Heading */}
      <div className="col-12 flex items-start justify-center gap-[1rem] text-[1.15rem] sm:text-[1.5rem] uppercase text-color-GR font-bold flex-col">
        <div className="flex items-center justify-start gap-[0.5rem]">
          <FontAwesomeIcon icon={faDotCircle} />
          <span>Total Repairs :</span>
        </div>
        <div className="text-[0.8rem] italic">
          <FontAwesomeIcon icon={faArrowRightLong} />
          <span className="ms-2">Distribution of Repaired & Pending Notes</span>
        </div>
      </div>
      {/* Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
          >
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "2px solid #ccc",
              textTransform: "uppercase",
              color: "#f5cf87",
            }}
            formatter={(value, name) => [`${value}`, name]}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalRepairs;
