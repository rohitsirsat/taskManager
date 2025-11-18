import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/api/index.js";
import { Loader } from "@/components/Loader";

const ProjectContext = createContext({
  projects: [],
  isLoading: true,
  fetchAllProjects: async () => {},
  createNewProject: async () => {},
  updateExistingProject: async () => {},
  deleteExistingProject: async () => {},
});

const useProject = () => useContext(ProjectContext);

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getAllProjects();

      setProjects(response?.data?.data?.projects);

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
    setIsLoading(true);
    try {
      const response = await createProject(data);

      return response;
    } catch (error) {
      console.log("ERR IN PRO CRE: ", error);
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateExistingProject = async (projectId, data) => {
    setIsLoading(true);
    try {
      const response = await updateProject(projectId, data);
      return response;
    } catch (error) {
      console.log("ERR IN PRO UPD: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteExistingProject = async (projectId) => {
    setIsLoading(true);
    try {
      const response = await deleteProject(projectId);
      return response;
    } catch (error) {
      console.log("ERR IN PRO DELE: ", error);
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        createNewProject,
        fetchAllProjects,
        updateExistingProject,
        deleteExistingProject,
        isLoading,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectContext, useProject, ProjectProvider };
