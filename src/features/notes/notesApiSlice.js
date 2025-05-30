import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

// Notes Adapter for Normalized State
const notesAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

// Initializing an Empty State
const initialState = notesAdapter.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //ENDPOINT # 1 => QUERY # 1 : GET ALL NOTES
    getNotes: builder.query({
      query: () => ({
        url: "/notes",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedNotes = responseData.map((note) => {
          note.id = note._id;
          return note;
        });
        return notesAdapter.setAll(initialState, loadedNotes);
      },
      providesTags: (result) => {
        if (result?.id) {
          return [
            { type: "Note", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Note", id })),
          ];
        } else return [{ type: "Note", id: "LIST" }];
      },
    }),
    //ENDPOINT # 2 => MUTATION # 1 : CREATE NEW NOTE
    addNewNote: builder.mutation({
      query: (initialNote) => ({
        url: "/notes",
        method: "POST",
        body: { ...initialNote },
      }),
      invalidatesTags: [
        { type: "Note", id: "LIST" },
        { type: "Analytics", id: "LIST" },
        { type: "Analytics", id: "USER_STATS" },
      ],
    }),
    //ENDPOINT # 3 => MUTATION # 2 : UPDATE NOTE
    updateNote: builder.mutation({
      query: (initialNote) => ({
        url: "/notes",
        method: "PATCH",
        body: { ...initialNote },
      }),
      invalidatesTags: (arg) => [
        { type: "Note", id: arg.id },
        { type: "Analytics", id: "LIST" },
        { type: "Analytics", id: "USER_STATS" },
      ],
    }),
    //ENDPOINT # 4 => MUTATION # 3 : UPDATE NOTE
    deleteNote: builder.mutation({
      query: ({ id }) => ({
        url: "/notes",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (arg) => [
        { type: "Note", id: arg.id },
        { type: "Analytics", id: "LIST" },
        { type: "Analytics", id: "USER_STATS" },
      ],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice;

// Selecting the Query Result Object
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select();

// Creating the Memoized Selector for Notes Data
const selectNotesData = createSelector(
  // Input Function whose Result will be Used
  selectNotesResult,
  (notesResult) => notesResult.data
  // Retrieves Data Object which Contains "ids" Array and "entities" Object from the Normalized State
);

// Built-In Selectors Returned by the Entity Adapter
export const {
  selectAll: selectAllNotes,
  selectById: selectNoteById,
  selectIds: selectNoteIds,
} = notesAdapter.getSelectors(
  // Passing in the Selector that will Return the Notes Slice of State
  (state) => selectNotesData(state) ?? initialState
);
