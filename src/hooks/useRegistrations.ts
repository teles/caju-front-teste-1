import { useEffect, useState } from "react";
import axios from "axios";
import { Registration } from "~/types/registration";

const useRegistrations = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = "http://localhost:3000";

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const response: { data: Registration[] } = await axios.get(
        `${apiUrl}/registrations`,
      );
      setRegistrations(response.data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch registrations",
      );
    } finally {
      setLoading(false);
    }
  };

  const searchByCpf = async (cpf: string) => {
    setLoading(true);
    const url = `${apiUrl}/registrations?cpf=${cpf}`;
    try {
      const response: { data: Registration[] } =
        await axios.get<Registration[]>(url);
      setRegistrations(response.data);
      setError(null);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch registrations",
      );
    } finally {
      setLoading(false);
    }
  };

  const addRegistration = async (newRegistration: Omit<Registration, "id">) => {
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/registrations`, newRegistration);
      await fetchRegistrations();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to add registration",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return {
    registrations,
    loading,
    error,
    fetchRegistrations,
    addRegistration,
    searchByCpf,
  };
};

export default useRegistrations;
