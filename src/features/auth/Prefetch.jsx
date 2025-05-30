import { store } from "../../app/store";
import { notesApiSlice } from "../notes/notesApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { analyticsApiSlice } from "../analytics/analyticsApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Prefetch = () => {
  // Current User Credentials
  const { isAdmin, isManager } = useAuth();
  useEffect(() => {
    // Prefetching Employee Based Data
    store.dispatch(
      notesApiSlice.util.prefetch("getNotes", "notesList", { force: true })
    );
    // Prefetching Admin or a Manager Based Data
    if (isAdmin || isManager) {
      store.dispatch(
        usersApiSlice.util.prefetch("getUsers", "usersList", { force: true })
      );
      store.dispatch(
        analyticsApiSlice.util.prefetch("getAnalytics", "analyticsData", {
          force: true,
        })
      );
      store.dispatch(
        analyticsApiSlice.util.prefetch("getUserNotesStats", "userStatsData", {
          force: true,
        })
      );
      store.dispatch(
        analyticsApiSlice.util.prefetch("getActiveUsers", "activeUsersData", {
          force: true,
        })
      );
      store.dispatch(
        analyticsApiSlice.util.prefetch(
          "getEmployeePerformance",
          "employeePerformanceData",
          {
            force: true,
          }
        )
      );
      store.dispatch(
        analyticsApiSlice.util.prefetch(
          "getRepairTimeDistribution",
          "repairTimeData",
          {
            force: true,
          }
        )
      );
      store.dispatch(
        analyticsApiSlice.util.prefetch(
          "getNotesCreationTrend",
          "notesCrTrendData",
          {
            force: true,
          }
        )
      );
      store.dispatch(
        analyticsApiSlice.util.prefetch(
          "getNotesRepairTrend",
          "notesRepTrendData",
          {
            force: true,
          }
        )
      );
    }
  }, [isAdmin, isManager]);

  return <Outlet />;
};

export default Prefetch;
