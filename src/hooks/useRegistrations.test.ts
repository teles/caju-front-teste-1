import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import useRegistrations from "./useRegistrations";
import { Registration, RegistrationStatus } from "~/types/registration";

const mock = new MockAdapter(axios);

const registrationsMock: Registration[] = [
  {
    id: "1",
    admissionDate: "2023-10-22",
    email: "luiz@caju.com.br",
    employeeName: "Luiz Filho",
    status: "APPROVED" as Registration["status"],
    cpf: "56642105087",
  },
  {
    id: "2",
    admissionDate: "2023-10-22",
    email: "jose@caju.com.br",
    employeeName: "José Leão",
    status: "REPROVED" as Registration["status"],
    cpf: "78502270001",
  },
];

describe("useRegistrations", () => {
  afterEach(() => {
    mock.reset();
  });

  it("should fetch registrations successfully", async () => {
    mock
      .onGet("http://localhost:3000/registrations")
      .reply(200, registrationsMock);

    const { result, waitFor } = renderHook(() => useRegistrations());

    await act(async () => {
      await result.current.fetchRegistrations();
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeNull();
    expect(result.current.registrations).toEqual(registrationsMock);
  });

  it("should handle fetch registrations error", async () => {
    mock.onGet("http://localhost:3000/registrations").reply(500);

    const { result, waitFor } = renderHook(() => useRegistrations());

    await act(async () => {
      await result.current.fetchRegistrations();
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("Request failed with status code 500");
    expect(result.current.registrations).toEqual([]);
  });

  it("should add a new registration successfully", async () => {
    const newRegistration = {
      admissionDate: "2023-10-23",
      email: "maria@caju.com.br",
      employeeName: "Maria Souza",
      status: "REVIEW" as Registration["status"],
      cpf: "12345678901",
    };

    mock
      .onPost("http://localhost:3000/registrations", newRegistration)
      .reply(201);
    mock
      .onGet("http://localhost:3000/registrations")
      .reply(200, [...registrationsMock, { ...newRegistration, id: "3" }]);

    const { result, waitFor } = renderHook(() => useRegistrations());

    await act(async () => {
      await result.current.addRegistration(newRegistration);
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeNull();
    expect(result.current.registrations).toEqual([
      ...registrationsMock,
      { ...newRegistration, id: "3" },
    ]);
  });

  it("should handle add registration error", async () => {
    const newRegistration = {
      admissionDate: "2023-10-23",
      email: "maria@caju.com.br",
      employeeName: "Maria Souza",
      status: "REVIEW" as Registration["status"],
      cpf: "12345678901",
    };

    mock.onPost("http://localhost:3000/registrations").reply(500);

    const { result, waitFor } = renderHook(() => useRegistrations());

    await act(async () => {
      await result.current.addRegistration(newRegistration);
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("Request failed with status code 500");
  });

  it("should handle fetch registrations by CPF error", async () => {
    const cpf = registrationsMock[0].cpf;

    mock.onGet(`http://localhost:3000/registrations?cpf=${cpf}`).reply(404);

    const { result, waitFor } = renderHook(() => useRegistrations());

    await act(async () => {
      await result.current.fetchRegistrations({ cpf });
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("Request failed with status code 404");
    expect(result.current.registrations).toEqual([]);
  });

  it("should update a registration successfully", async () => {
    const updatedFields = { status: RegistrationStatus.REPROVED };
    const updatedRegistration = { ...registrationsMock[0], ...updatedFields };

    mock
      .onPut(`http://localhost:3000/registrations/${updatedRegistration.id}`)
      .reply(200);
    mock
      .onGet("http://localhost:3000/registrations")
      .reply(200, [updatedRegistration, registrationsMock[1]]);

    const { result, waitFor } = renderHook(() => useRegistrations());

    await act(async () => {
      await result.current.updateRegistration(
        updatedRegistration.id,
        updatedFields,
      );
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.registrations).toEqual([
      updatedRegistration,
      registrationsMock[1],
    ]);
  });

  it("should delete a registration successfully", async () => {
    const idToDelete = registrationsMock[0].id;

    mock
      .onDelete(`http://localhost:3000/registrations/${idToDelete}`)
      .reply(200);
    mock
      .onGet("http://localhost:3000/registrations")
      .reply(200, registrationsMock.slice(1));

    const { result, waitFor } = renderHook(() => useRegistrations());

    await act(async () => {
      await result.current.deleteRegistration(idToDelete);
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeNull();
    expect(result.current.registrations).toEqual([registrationsMock[1]]);
  });

  it("should handle delete registration error", async () => {
    const idToDelete = registrationsMock[0].id;

    mock
      .onDelete(`http://localhost:3000/registrations/${idToDelete}`)
      .reply(500);

    const { result, waitFor } = renderHook(() => useRegistrations());

    await act(async () => {
      await result.current.deleteRegistration(idToDelete);
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("Request failed with status code 500");
  });
});
