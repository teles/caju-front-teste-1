// src/hooks/useRegistrations.test.ts
import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import useRegistrations from "./useRegistrations";
import { Registration } from "~/types/registration";

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

    const { result, waitForNextUpdate } = renderHook(() => useRegistrations());

    act(() => {
      result.current.fetchRegistrations();
    });

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.registrations).toEqual(registrationsMock);
  });

  it("should handle fetch registrations error", async () => {
    mock.onGet("http://localhost:3000/registrations").reply(500);

    const { result, waitForNextUpdate } = renderHook(() => useRegistrations());

    act(() => {
      result.current.fetchRegistrations();
    });

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Request failed with status code 500");
    expect(result.current.registrations).toEqual([]);
  });
});
