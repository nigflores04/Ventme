import { axiosBaseInstance } from "@/lib/axiosBaseInstanse";

export async function uploadFile(file: File) {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosBaseInstance.post(
      "/uploads/file",
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
