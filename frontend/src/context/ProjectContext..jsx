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

const ProjectContext = createContext({
  projects: [],
  isLoading: true,
  isLoadingMore: false,
  hasNextPage: false,
  currentPage: 1,
  totalPages: 1,
  totalProjects: 0,
  fetchAllProjects: async () => {},
  loadMoreProjects: async () => {},
  createNewProject: async () => {},
  updateExistingProject: async () => {},
  deleteExistingProject: async () => {},
});

const useProject = () => useContext(ProjectContext);

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);

  const fetchAllProjects = useCallback(async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await getAllProjects({ page });

      const data = response?.data?.data;

      setProjects(data.projects || []);
      setCurrentPage(data?.page || 1);
      setTotalPages(data?.totalPages || 1);
      setTotalProjects(data?.totalProjects || 0);
      setHasNextPage(data?.hasNextPage || false);

      return response.data;
    } catch (error) {
      setProjects([]);
      return error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load more projects:
  const loadMoreProjects = useCallback(async () => {
    if (!hasNextPage) return null;

    try {
      setIsLoadingMore(true);

      const nextPage = currentPage + 1;
      const response = await getAllProjects({ page: nextPage });

      const data = response?.data.data;

      // append new projects to existing list
      setProjects((prev) => [...prev, ...(data?.projects || [])]);

      setCurrentPage(data?.page || nextPage);
      setTotalPages(data?.totalPages || totalPages);
      setTotalProjects(data?.totalProjects || totalProjects);
      setHasNextPage(data?.hasNextPage || false);

      return response.data;
    } catch (error) {
      console.log("ERR IN PRO DELE: ", error);
      return error;
    } finally {
      setIsLoadingMore(false);
    }
  }, [currentPage, hasNextPage, totalPages]);

  useEffect(() => {
    fetchAllProjects();
  }, [fetchAllProjects]);

  const createNewProject = async (data) => {
    setIsLoading(true);
    try {
      const response = await createProject(data);

      return response;
    } catch (error) {
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
      setProjects((prevProject) =>
        prevProject.filter((project) => project._id !== projectId),
      );

      return response;
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        hasNextPage,
        currentPage,
        totalPages,
        totalProjects,
        loadMoreProjects,
        createNewProject,
        fetchAllProjects,
        updateExistingProject,
        deleteExistingProject,
        isLoading,
        isLoadingMore,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectContext, useProject, ProjectProvider };
