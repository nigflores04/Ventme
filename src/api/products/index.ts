import { axiosBaseInstance } from "@/lib/axiosBaseInstanse";

export async function getDesignProducts(imageUrl: string) {
  try {
    const response = await axiosBaseInstance.post("/products/search", {
      image_url: imageUrl,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
