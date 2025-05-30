import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import UserProfile from "./features/users/UserProfile";
import UsersNotes from "./features/users/UsersNotes";
import NewUserForm from "./features/users/NewUserForm";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";
import Dashboard from "./features/analytics/Dashboard";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import ErrorWrapper from "./pages/ErrorWrapper";
import { ROLES } from "./config/roles";
import { Toaster } from "react-hot-toast";
// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      {/* Application Parent Route */}
      <Routes>
        {/* Error Routes */}
        <Route path="/error" element={<ErrorWrapper />} />
        {/* Application Main Layout Wrapper */}
        <Route path="/" element={<Layout />}>
          {/* Application Index Route */}
          <Route index element={<Public />} />
          {/* Login Route */}
          <Route path="login" element={<Login />} />
          {/* Protected Routes Parent */}
          <Route element={<PersistLogin />}>
            {/* Authorization */}
            <Route
              element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
            >
              <Route element={<Prefetch />}>
                <Route path="dash" element={<DashLayout />}>
                  {/* Protected Routes Index Route */}
                  <Route index element={<Welcome />} />
                  <Route
                    element={
                      <RequireAuth
                        allowedRoles={[ROLES.Admin, ROLES.Manager]}
                      />
                    }
                  >
                    {/* Users Parent Route */}
                    <Route path="users">
                      {/* Users Index Route */}
                      <Route index element={<UsersList />} />
                      <Route path="new" element={<NewUserForm />} />
                      <Route path="edit/:id" element={<EditUser />} />
                      <Route path=":username" element={<UserProfile />} />
                      <Route
                        path=":username/:notesCategory"
                        element={<UsersNotes />}
                      />
                      <Route path="analytics" element={<Dashboard />} />
                    </Route>
                  </Route>
                  {/* Notes Parent Route */}
                  <Route path="notes">
                    {/* Notes Index Route */}
                    <Route index element={<NotesList />} />
                    <Route path=":id" element={<EditNote />} />
                    <Route path="new" element={<NewNote />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
