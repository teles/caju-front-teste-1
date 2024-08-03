import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Registration } from "~/types/registration";
import { ActionResponse } from "~/types/actionResponse";

const useRegistrations = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = "http://localhost:3000";

  /**
   * Função assíncrona que busca as inscrições.
   *
   * @returns Uma promessa que resolve em um objeto do tipo ActionResponse.
   * A promessa é resolvida com sucesso se as inscrições forem carregadas com sucesso,
   * caso contrário, a promessa é rejeitada com um objeto do tipo ActionResponse indicando a falha.
   */
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

  /**
   * Busca registros por CPF.
   *
   * @param cpf - O CPF a ser utilizado como filtro.
   * @returns Uma promessa que resolve em um objeto de resposta contendo o sucesso da operação e uma mensagem.
   */
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
        message: "Cadastros filtrados por CPF carregados com sucesso",
      };
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch registrations",
      );
      return {
        success: false,
        message: "Falha ao carregar cadastros filtrados por CPF",
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Adiciona um novo cadastro.
   *
   * @param newRegistration - O novo cadastro a ser adicionado.
   * @returns Uma promessa que resolve em um objeto contendo informações sobre o resultado da operação.
   */
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

  /**
   * Atualiza um registro de inscrição.
   *
   * @param id - O ID do registro de inscrição a ser atualizado.
   * @param updatedFields - Os campos atualizados do registro de inscrição.
   * @returns Uma promessa que resolve em um objeto de resposta de ação.
   *          - success: Um valor booleano indicando se a atualização foi bem-sucedida.
   *          - message: Uma mensagem descrevendo o resultado da atualização.
   */
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

  /**
   * Deleta um registro pelo seu ID.
   *
   * @param id - O ID do registro a ser deletado.
   * @returns Uma Promise que resolve em um objeto de resposta contendo informações sobre o sucesso ou falha da operação.
   */
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
