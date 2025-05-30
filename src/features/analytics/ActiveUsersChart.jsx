import {
  faArrowRightLong,
  faDotCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ActiveUsersChart = ({ activeUsers }) => {
  return (
    <div className="col-12 h-[400px] flex items-start justify-center flex-col gap-[2rem]">
      {/* Heading */}
      <div className="col-12 flex items-start justify-center gap-[1rem] text-[1.15rem] sm:text-[1.5rem] uppercase text-color-GR font-bold flex-col">
        <div className="flex items-center justify-start gap-[0.5rem]">
          <FontAwesomeIcon icon={faDotCircle} />
          <span>Active Users Stats :</span>
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
        <BarChart
          data={activeUsers}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid />
          <XAxis dataKey="name" stroke="#4c5c75" strokeWidth={2} />
          <YAxis
            stroke="#4c5c75"
            strokeWidth={2}
            allowDecimals={false}
            domain={[0, 2]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "2px solid #ccc",
              textTransform: "uppercase",
            }}
            separator=""
            formatter={(_value, _name, props) => {
              return [`Login Time : ${props.payload.loginTime}`];
            }}
          />
          <Bar dataKey="count" fill="#c75c5c" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActiveUsersChart;
