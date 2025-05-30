import { apiSlice } from "../../app/api/apiSlice";

export const analyticsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //ENDPOINT # 1 => QUERY # 1 : GET ANALYTICS DATA
    getAnalytics: builder.query({
      query: () => "/analytics",
      providesTags: [{ type: "Analytics", id: "LIST" }],
    }),
    //ENDPOINT # 2 => QUERY # 2 : GET USERS NOTES STATS
    getUserNotesStats: builder.query({
      query: () => "/analytics/user-notes-stats",
      providesTags: [{ type: "Analytics", id: "USER_STATS" }],
    }),
    //ENDPOINT # 3 => QUERY # 3 : GET ACTIVE USERS
    getActiveUsers: builder.query({
      query: () => "/analytics/active-users",
      providesTags: [{ type: "Analytics", id: "ACTIVE_USERS" }],
    }),
    //ENDPOINT # 4 => QUERY # 4 : GET EMPLOYEE PERFORMANCE
    getEmployeePerformance: builder.query({
      query: () => "/analytics/employee-performance",
      providesTags: [{ type: "Analytics", id: "EMP_PERF" }],
    }),
    //ENDPOINT # 5 => QUERY # 5 : GET REPAIR TIME DISTRIBUTION
    getRepairTimeDistribution: builder.query({
      query: () => "/analytics/repair-time-distribution",
      providesTags: [{ type: "Analytics", id: "REPAIR_TIME_DIST" }],
    }),
    //ENDPOINT # 6 => QUERY # 6 : GET NOTES CREATION TREND
    getNotesCreationTrend: builder.query({
      query: () => "/analytics/notes-creation-trend",
      providesTags: [{ type: "Analytics", id: "NOTES_CR_TREND" }],
    }),
    //ENDPOINT # 7 => QUERY # 7 : GET NOTES REPAIR TREND
    getNotesRepairTrend: builder.query({
      query: () => "/analytics/notes-repair-trend",
      providesTags: [{ type: "Analytics", id: "NOTES_REP_TREND" }],
    }),
  }),
});

export const {
  useGetAnalyticsQuery,
  useGetUserNotesStatsQuery,
  useGetActiveUsersQuery,
  useGetEmployeePerformanceQuery,
  useGetRepairTimeDistributionQuery,
  useGetNotesCreationTrendQuery,
  useGetNotesRepairTrendQuery,
} = analyticsApiSlice;
