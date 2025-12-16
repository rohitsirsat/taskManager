import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/themeProvider.jsx";
import { AuthProvider } from "./context/authContex";
import { Toaster } from "./components/ui/sonner";
import { ProjectProvider } from "@/context/ProjectContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ProjectProvider>
            <App />
          </ProjectProvider>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
