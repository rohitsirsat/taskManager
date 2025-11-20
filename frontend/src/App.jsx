import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import Layout from "./layout.jsx";
import NotesPage from "./pages/NotesPage.jsx";
import Tasks from "./pages/Tasks.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import { useAuth } from "./context/authContex.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import CreateProjectForm from "./components/CreateProjectForm.jsx";

function App() {
  const { token, user } = useAuth();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            token && user?._id ? (
              <Navigate to="/projects" />
            ) : (
              <Navigate to="/welcome" />
            )
          }
        ></Route>
        {/* projects routes starts */}

        <Route path="/" element={<Layout />}>
          <Route
            path="/projects"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-project"
            element={
              <PrivateRoute>
                <CreateProjectForm />
              </PrivateRoute>
            }
          />

          {/* projects routes ends*/}

          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            }
          />

          <Route
            path="/notes"
            element={
              <PrivateRoute>
                <NotesPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
        </Route>

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <SignInPage />
            </PublicRoute>
          }
        />
        <Route
          path="/welcome"
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
