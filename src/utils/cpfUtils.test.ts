import { validateCpfChange, cpfMask } from "./cpfUtils";
import { ChangeEvent } from "react";

describe("cpfUtils", () => {
  describe("validateCpfChange", () => {
    it("should return valid value and no error for a valid CPF", () => {
      const event = {
        target: { value: "012.345.678-90" },
      } as ChangeEvent<HTMLInputElement>;

      const result = validateCpfChange(event);
      expect(result.value).toBe("012.345.678-90");
      expect(result.error).toBe("");
    });

    it("should return value and error for an invalid CPF", () => {
      const event = {
        target: { value: "123.456.789-00" },
      } as ChangeEvent<HTMLInputElement>;

      const result = validateCpfChange(event);
      expect(result.value).toBe("123.456.789-00");
      expect(result.error).toBe("CPF inválido");
    });

    it("should return value and no error for incomplete CPF", () => {
      const event = {
        target: { value: "123.456.789" },
      } as ChangeEvent<HTMLInputElement>;

      const result = validateCpfChange(event);
      expect(result.value).toBe("123.456.789");
      expect(result.error).toBe("");
    });
  });

  describe("cpfMask", () => {
    it("should match the expected mask", () => {
      const expectedMask = [
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
      ];
      expect(cpfMask).toEqual(expectedMask);
    });
  });
});
