import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getAllProjects, createProject } from "@/api/index.js";
import { Loader } from "@/components/Loader";

const ProjectContext = createContext({
  projects: [],
  isLoading: true,
  fetchAllProjects: async () => {},
  createNewProject: async () => {},
});

const useProject = () => useContext(ProjectContext);

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getAllProjects();

      setProjects(response.data.data.projects);

      return response.data;
    } catch (error) {
      setProjects([]);
      return error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllProjects();
  }, [fetchAllProjects]);

  const createNewProject = async (data) => {
    try {
      const response = await createProject(data);

      return response;
    } catch (error) {
      return error;
    }
  };

  return (
    <ProjectContext.Provider
      value={{ projects, createNewProject, fetchAllProjects, isLoading }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectContext, useProject, ProjectProvider };
