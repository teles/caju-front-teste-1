import { useState } from "react";
import axios from "axios";

enum RegistrationStatus {
  APROVED = "APROVED",
  REVIEWING = "REVIEW",
  REPROVED = "REPROVED",
}

export interface Registration {
  id: string;
  admissionDate: string;
  email: string;
  employeeName: string;
  status: RegistrationStatus;
  cpf: string;
}

const useRegistrations = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = "http://localhost:3000";

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const response: { data: Registration[] } = await axios.get(
        `${apiUrl}/registrations`
      );
      setRegistrations(response.data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch registrations"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    registrations,
    loading,
    error,
    fetchRegistrations,
  };
};

export default useRegistrations;
