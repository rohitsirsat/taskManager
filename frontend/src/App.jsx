import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import Layout from "./layout.jsx";
import NotesPage from "./pages/NotesPage.jsx";
import Tasks from "./pages/Tasks.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/projects" element={<HomePage />} />
          <Route path="/tasks" element={<Tasks />} />

          <Route path="/notes" element={<NotesPage />} />
        </Route>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />
        {/* <Route path="/home" element={<HomePage />} /> */}
      </Routes>
    </>
  );
}

export default App;
