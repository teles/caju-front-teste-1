import { validateCpfChange, cpfMask } from "./cpfUtils";

describe("cpfUtils", () => {
  describe("validateCpfChange", () => {
    it("should return valid value, no error, and isCompleted true for a valid CPF", () => {
      const value = "012.345.678-90";
      const result = validateCpfChange(value);
      expect(result.value).toBe(value);
      expect(result.error).toBe("");
      expect(result.isCompleted).toBe(true);
    });

    it("should return value, error, and isCompleted true for an invalid CPF", () => {
      const value = "123.456.789-00";
      const result = validateCpfChange(value);
      expect(result.value).toBe(value);
      expect(result.error).toBe("CPF inválido");
      expect(result.isCompleted).toBe(true);
    });

    it("should return value, no error, and isCompleted false for an incomplete CPF", () => {
      const value = "123.456.789";
      const result = validateCpfChange(value);
      expect(result.value).toBe(value);
      expect(result.error).toBe("");
      expect(result.isCompleted).toBe(false);
    });

    it("should return value, no error, and isCompleted false for an empty string", () => {
      const value = "";
      const result = validateCpfChange(value);
      expect(result.value).toBe(value);
      expect(result.error).toBe("");
      expect(result.isCompleted).toBe(false);
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
