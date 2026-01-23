/**
 * Fetch the client's IP address
 * @returns Promise with the IP address string
 */
export async function getClientIpAddress(): Promise<string> {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Failed to fetch IP address:", error);
    throw error;
  }
}

