import { validateCpfChange, cpfMask } from "./cpfUtils";

describe("cpfUtils", () => {
  describe("validateCpfChange", () => {
    it("should return valid value and no error for a valid CPF", () => {
      const value = "012.345.678-90";
      const result = validateCpfChange(value);
      expect(result.value).toBe(value);
      expect(result.error).toBe("");
    });

    it("should return value and error for an invalid CPF", () => {
      const value = "123.456.789-00";
      const result = validateCpfChange(value);
      expect(result.value).toBe(value);
      expect(result.error).toBe("CPF inválido");
    });

    it("should return value and no error for incomplete CPF", () => {
      const value = "123.456.789";
      const result = validateCpfChange(value);
      expect(result.value).toBe(value);
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
