import { useLocation, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import useTitle from "../../hooks/useTitle";
import TotalRepairs from "./TotalRepairs";
import AvgRepairTime from "./AvgRepairTime";
import RepairTimeDistribution from "./RepairTimeDistribution";
import DashboardChart from "./DashboardChart";
import ActiveUsersChart from "./ActiveUsersChart";
import EmployeePerformance from "./EmployeePerformance";
import UserStatsChart from "./UserStatsChart";
import NotesCreationTrend from "./NotesCreationTrend";
import {
  useGetActiveUsersQuery,
  useGetAnalyticsQuery,
  useGetEmployeePerformanceQuery,
  useGetRepairTimeDistributionQuery,
  useGetNotesCreationTrendQuery,
  useGetUserNotesStatsQuery,
  useGetNotesRepairTrendQuery,
} from "./analyticsApiSlice";
import NotesRepairTrend from "./NotesRepairTrend";

const Dashboard = () => {
  // Location and Navigation
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // Document Title Hook
  useTitle("Admin Dashboard");
  // Using Analytics Query from Analytics API Slice
  const {
    data: analyticsData,
    isLoading: analyticsDataLoading,
    isError: analyticsDataError,
    error: analyticsError,
  } = useGetAnalyticsQuery("analyticsData", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  // Using User Notes Stats Query from Analytics API Slice
  const {
    data: userNotesStats,
    isLoading: userStatsLoading,
    isError: userStatsError,
    error: userError,
  } = useGetUserNotesStatsQuery("userStatsData", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  // Using Active Users Query from Analytics API Slice
  const {
    data: activeUsers,
    isLoading: usersLoading,
    isError: usersError,
    error: activeUsersError,
  } = useGetActiveUsersQuery("activeUsersData", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  // Using Employee Performance Query from Analytics API Slice
  const {
    data: performanceData,
    isLoading: performanceDataLoading,
    isError: performanceDataError,
    error: performanceError,
  } = useGetEmployeePerformanceQuery("employeePerformanceData", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  // Using Repair Time Distribution Query from Analytics API Slice
  const {
    data: repairTimeData,
    isLoading: repairTimeDataLoading,
    isError: repairTimeDataError,
    error: repairError,
  } = useGetRepairTimeDistributionQuery("repairTimeData", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  // Using Notes Creation Trend Query from Analytics API Slice
  const {
    data: notesCrTrendData,
    isLoading: notesCrTrendDataLoading,
    isError: notesCrTrendDataError,
    error: notesCrTrendError,
  } = useGetNotesCreationTrendQuery("notesCrTrendData", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  // Using Notes Repair Trend Query from Analytics API Slice
  const {
    data: notesRepTrendData,
    isLoading: notesRepTrendDataLoading,
    isError: notesRepTrendDataError,
    error: notesRepTrendError,
  } = useGetNotesRepairTrendQuery("notesRepTrendData", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  // If Loading
  if (
    analyticsDataLoading ||
    userStatsLoading ||
    usersLoading ||
    performanceDataLoading ||
    repairTimeDataLoading ||
    notesCrTrendDataLoading ||
    notesRepTrendDataLoading
  )
    return (
      <section className="h-screen flex items-center justify-center bg-color-LG">
        <PulseLoader color={"#f5cf87"} />
      </section>
    );
  // Error Handling
  if (
    analyticsDataError ||
    userStatsError ||
    usersError ||
    performanceDataError ||
    repairTimeDataError ||
    notesCrTrendDataError ||
    notesRepTrendDataError
  ) {
    navigate("/error", {
      // Passing the Error, Pathname, Document Title, Username, Password, Active, Roles & Avatar to the Error Component
      state: {
        error:
          analyticsError ||
          userError ||
          activeUsersError ||
          performanceError ||
          repairError ||
          notesCrTrendError ||
          notesRepTrendError ||
          "No Data Available Currently",
        pathname,
        title: document.title,
      },
      replace: true,
    });
    return null;
  }
  // Destructuring Analytics Data from the Query Data
  const { totalNotes, totalRepairs, avgRepairTime, repairsTrend } =
    analyticsData;
  // Active Users Chart Data
  const activeUsersChartData = activeUsers?.map((user) => ({
    name: user.username,
    count: 1,
    loginTime: new Date(user.loginTime).toLocaleTimeString(),
  }));
  return (
    // Admin Dashboard Main Wrapper
    <section className="col-12 absolute top-[20px] pb-[20px] flex flex-col items-center justify-center gap-[4rem] px-[1rem] sm:px-[2rem] tracking-[1px]">
      {/* Dashboard Heading */}
      <div className="sticky top-[20px] overflow-hidden z-10 col-12 text-white text-[1.5rem] sm:text-[2rem] font-bold bg-color-R2 p-[0.5rem] rounded-lg uppercase shadow-xl">
        <span>Admin Dashboard</span>
        <FontAwesomeIcon icon={faChartBar} className="ms-3" />
      </div>
      {/* Dashboard Statistics */}
      <TotalRepairs totalNotes={totalNotes} totalRepairs={totalRepairs} />
      <AvgRepairTime avgRepairTime={avgRepairTime} />
      {/* Dashboard Charts */}
      <RepairTimeDistribution repairTimeData={repairTimeData} />
      <ActiveUsersChart activeUsers={activeUsersChartData} />
      <DashboardChart repairsTrend={repairsTrend} />
      <EmployeePerformance performanceData={performanceData} />
      <UserStatsChart userNotesStats={userNotesStats} />
      <NotesCreationTrend notesCrTrendData={notesCrTrendData} />
      <NotesRepairTrend
        notesRepTrendData={notesRepTrendData}
        avgRepairTime={avgRepairTime}
      />
    </section>
  );
};

export default Dashboard;
