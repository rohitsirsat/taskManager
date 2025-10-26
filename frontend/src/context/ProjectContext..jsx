import React, { createContext, useContext, useState, useEffect } from "react";
import { getAllProjects, createProject } from "@/api/index.js";
import { Loader } from "@/components/Loader";

const ProjectContext = createContext({
  projects: [],
  isLoading: Boolean,
  fetchAllProjects: async () => {},
  createNewProject: async () => {},
});

const useProject = () => useContext(ProjectContext);

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        setIsLoading(true);
        const response = await getAllProjects();

        setProjects(response.data.data.projects);
        setIsLoading(false);
        return response.data;
      } catch (error) {
        setIsLoading(false);
        return error;
      }
    };
    fetchAllProjects();
  }, []);

  const createNewProject = async (data) => {
    try {
      const response = await createProject(data);

      return response;
    } catch (error) {
      return error;
    }
  };

  return (
    <ProjectContext.Provider value={{ projects, createNewProject, isLoading }}>
      {isLoading ? <Loader message="Loading ProjectFlow..." /> : children}
    </ProjectContext.Provider>
  );
};

export { ProjectContext, useProject, ProjectProvider };
