import { GenerateDesignDto } from "@/interface/design";
import { axiosBaseInstance, baseURL } from "@/lib/axiosBaseInstanse";
import { handleApiError } from "@/lib/errorHandler";
import axios from "axios";

export async function generateDesigns(data: GenerateDesignDto) {
  try {
    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("prompt", data.prompt);
    formData.append("room_type", data.roomType);

    if (data.stylePreset) {
      formData.append("style_preset", data.stylePreset);
    }
    if (data.projectId) {
      formData.append("project_id", data.projectId);
    }

    const response = await axiosBaseInstance.post(
      "/generations/variations",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

export async function downloadDesigns(
  generationId: string,
  resolution: number | null
) {
  try {
    const url = resolution
      ? `/downloads/generation/${generationId}?scale=${resolution}`
      : `/downloads/generation/${generationId}`;

    const response = await axiosBaseInstance.get(url, {
      responseType: "blob",
    });

    return response.data;
  } catch (error) {
    handleApiError(error, { showToast: false }); // Don't show toast for download errors
    throw error;
  }
}

export async function fetchDesign(generationId: string) {
  try {
    const response = await axios.get(`${baseURL}/generations/${generationId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}
