import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";

// Setting Base Query
const baseQuery = fetchBaseQuery({
  baseUrl: "https://techify-repairs-api.onrender.com",
  credentials: "include", // Includes "Cookies" (Refresh Token) is Sent With Requests
  prepareHeaders: (headers, { getState }) => {
    // Finding the Token from Auth Slice
    const token = getState().auth.token;
    // Setting the Authorization Headers with Access Token
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Base Query with Automatic Access Token Refetch through Refresh Token
const baseQueryWithReauth = async (args, api, extraOptions) => {
  /* *
   * * PARAMETERS INFORMATION:
   * * args => Contains URL, Method and Body for the Requested Endpoint
   * * api => Provided by RTK Query Contains Utility Properties & Functions => getState() & dispatch()
   * * extraOptions => Extra Options that might have been Passed to the Query
   * */
  // Performing the Request Using Our Base Query
  let result = await baseQuery(args, api, extraOptions);
  // 403 => Access Token has Expired
  if (result?.error?.status === 403) {
    // Sending Refresh Token to Get New Access Token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    // If Refresh Token Exists and Provides a New Access Token
    if (refreshResult?.data) {
      // Dispatching the Action & Storing the New Access Token in State
      api.dispatch(setCredentials({ ...refreshResult.data }));
      // Retrying Original Query with New Access Token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // 403 => Refresh Token has Expired
      if (refreshResult?.error?.status === 403) {
        // Modifying the Error Message to Show Session Expiry
        refreshResult.error.data.message = "Your Login Session has Expired";
      }
      // Returning the Refresh Result which Contains Error Message
      return refreshResult;
    }
  }
  // Returning the Result with Original or Refreshed Access Token
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Note", "User", "Analytics"],
  endpoints: () => ({}),
});
