import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Registration } from "~/types/registration";

const useRegistrations = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = "http://localhost:3000";

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    try {
      const response: { data: Registration[] } = await axios.get(
        `${apiUrl}/registrations`,
      );
      setRegistrations(response.data);
      return response.data;
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch registrations",
      );
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchByCpf = async (cpf: string): Promise<void> => {
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

  const updateRegistration = async (
    id: string,
    updatedFields: Partial<Registration>,
  ) => {
    setLoading(true);
    const registration = registrations.find((r) => r.id === id);
    if (!registration) {
      setError("Registration not found");
      setLoading(false);
      return;
    }
    const mergedRegistration = { ...registration, ...updatedFields };
    try {
      await axios.put(`${apiUrl}/registrations/${id}`, mergedRegistration);
      await fetchRegistrations();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update registration",
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteRegistration = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`${apiUrl}/registrations/${id}`);
      await fetchRegistrations();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete registration",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  return {
    registrations,
    loading,
    error,
    fetchRegistrations,
    addRegistration,
    updateRegistration,
    fetchByCpf,
    deleteRegistration,
  };
};

export default useRegistrations;
