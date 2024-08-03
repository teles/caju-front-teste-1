import React, { createContext, useContext, useEffect, ReactNode } from "react";
import useRegistrations from "~/hooks/useRegistrations";
import { Registration } from "~/types/registration";

type RegistrationContextType = {
  registrations: Registration[];
  loading: boolean;
  error: string | null;
  addRegistration: (newRegistration: Omit<Registration, "id">) => Promise<void>;
  updateRegistration: (
    id: string,
    updatedFields: Partial<Registration>,
  ) => Promise<void>;
  deleteRegistration: (id: string) => Promise<void>;
};

const RegistrationContext = createContext<RegistrationContextType | undefined>(
  undefined,
);

type RegistrationProviderProps = {
  children: ReactNode;
};

export const RegistrationProvider: React.FC<RegistrationProviderProps> = ({
  children,
}: RegistrationProviderProps) => {
  const {
    registrations,
    loading,
    error,
    fetchRegistrations,
    addRegistration,
    updateRegistration,
    deleteRegistration,
  } = useRegistrations();

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  return (
    <RegistrationContext.Provider
      value={{
        registrations,
        loading,
        error,
        addRegistration,
        updateRegistration,
        deleteRegistration,
      }}
    >
      <>{children}</>
    </RegistrationContext.Provider>
  );
};

export const useRegistrationContext = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error(
      "useRegistrationContext must be used within a RegistrationProvider",
    );
  }
  return context;
};
