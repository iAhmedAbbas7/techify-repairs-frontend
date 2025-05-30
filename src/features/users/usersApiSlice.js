import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

// Users Adapter for Normalized State
const usersAdapter = createEntityAdapter();

// Initializing an Empty State
const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //ENDPOINT # 1 => QUERY # 1 : GET ALL USERS
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result) => {
        if (result?.id) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
    //ENDPOINT # 2 => MUTATION # 1 : CREATE NEW USER
    addNewUser: builder.mutation({
      query: (initialUserData) => {
        if (initialUserData instanceof FormData) {
          return {
            url: "/users",
            method: "POST",
            body: initialUserData,
          };
        } else {
          return {
            url: "/users",
            method: "POST",
            body: initialUserData,
          };
        }
      },
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    //ENDPOINT # 3 => MUTATION # 2 : UPDATE USER
    updateUser: builder.mutation({
      query: (initialUserData) => {
        if (initialUserData instanceof FormData) {
          return {
            url: "/users",
            method: "PATCH",
            body: initialUserData,
          };
        } else {
          return {
            url: "/users",
            method: "PATCH",
            body: initialUserData,
          };
        }
      },
      invalidatesTags: (arg) => [{ type: "User", id: arg.id }],
    }),
    //ENDPOINT # 4 => MUTATION # 3 : UPDATE USER
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: "/users",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;

// Selecting the Query Result Object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// Creating the Memoized Selector for Users Data
const selectUsersData = createSelector(
  // Input Function whose Result will be Used
  selectUsersResult,
  (usersResult) => usersResult.data
  // Retrieves Data Object which Contains "ids" Array and "entities" Object from the Normalized State
);

// Built-In Selectors Returned by the Entity Adapter
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors(
  // Passing in the Selector that will Return the Users Slice of State
  (state) => selectUsersData(state) ?? initialState
);
