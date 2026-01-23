import { useState, useEffect } from "react";
import { getClientIpAddress } from "@/api/ip";

export function useIpAddress() {
  const [ipAddress, setIpAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchIpAddress = async () => {
      try {
        setIsLoading(true);
        const ip = await getClientIpAddress();
        
        if (isMounted) {
          setIpAddress(ip);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Failed to fetch IP"));
          setIpAddress(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchIpAddress();

    return () => {
      isMounted = false;
    };
  }, []);

  return { ipAddress, isLoading, error };
}

