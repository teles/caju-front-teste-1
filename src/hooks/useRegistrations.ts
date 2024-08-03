import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Registration } from "~/types/registration";
import { ActionResponse } from "~/types/actionResponse";

const useRegistrations = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = "http://localhost:3000";

  const fetchRegistrations = useCallback(async (): Promise<ActionResponse> => {
    setLoading(true);
    try {
      const response: { data: Registration[] } = await axios.get(
        `${apiUrl}/registrations`,
      );
      setRegistrations(response.data);
      return {
        success: true,
        message: "Cadastros carregados com sucesso",
      };
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch registrations",
      );
      return {
        success: false,
        message: "Falha ao carregar cadastros",
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchByCpf = async (cpf: string): Promise<ActionResponse> => {
    setLoading(true);
    const url = `${apiUrl}/registrations?cpf=${cpf}`;
    try {
      const response: { data: Registration[] } =
        await axios.get<Registration[]>(url);
      setRegistrations(response.data);
      setError(null);
      return {
        success: true,
        message: "Cadastros carregados com sucesso",
      };
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch registrations",
      );
      return {
        success: false,
        message: "Falha ao carregar cadastros",
      };
    } finally {
      setLoading(false);
    }
  };

  const addRegistration = async (
    newRegistration: Omit<Registration, "id">,
  ): Promise<ActionResponse> => {
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/registrations`, newRegistration);
      await fetchRegistrations();
      return {
        success: true,
        message: "Cadastro atualizado com sucesso",
      };
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to add registration",
      );
      return {
        success: false,
        message: "Falha ao adicionar cadastro",
      };
    } finally {
      setLoading(false);
    }
  };

  const updateRegistration = async (
    id: string,
    updatedFields: Partial<Registration>,
  ): Promise<ActionResponse> => {
    setLoading(true);
    const registration = registrations.find((r) => r.id === id);
    if (!registration) {
      setError("Registration not found");
      setLoading(false);
      return {
        success: false,
        message: "Registro não encontrado",
      };
    }
    const mergedRegistration = { ...registration, ...updatedFields };
    try {
      await axios.put(`${apiUrl}/registrations/${id}`, mergedRegistration);
      await fetchRegistrations();
      return {
        success: true,
        message: "Cadastro atualizado com sucesso",
      };
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update registration",
      );
      return {
        success: false,
        message: "Falha ao atualizar cadastro",
      };
    } finally {
      setLoading(false);
    }
  };

  const deleteRegistration = async (id: string): Promise<ActionResponse> => {
    setLoading(true);
    try {
      await axios.delete(`${apiUrl}/registrations/${id}`);
      await fetchRegistrations();
      return {
        success: true,
        message: "Cadastro deletado com sucesso",
      };
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete registration",
      );
      return {
        success: false,
        message: "Falha ao deletar cadastro",
      };
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
