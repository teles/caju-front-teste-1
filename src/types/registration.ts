export enum RegistrationStatus {
  APPROVED = "APPROVED",
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