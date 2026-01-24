import { ProjectDto } from "@/interface/design";
import { axiosBaseInstance } from "@/lib/axiosBaseInstanse";
import { handleApiError } from "@/lib/errorHandler";



export const createProject = async (values: ProjectDto) => {
  try {
    const response = await axiosBaseInstance.post("/projects", values);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};


export const getProjects = async () => {
  try {
    const response = await axiosBaseInstance.get("/projects");
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};


export const getProjectById = async (projectId: string) => {
  try {
    const response = await axiosBaseInstance.get(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
