import { removeNonNumeric } from "../utils/textUtils";

describe("removeNonNumeric", () => {
  it("should remove all non-numeric characters from the text", () => {
    const text = "012.345.678-90";
    const expected = "01234567890";
    const result = removeNonNumeric(text);
    expect(result).toEqual(expected);
  });

  it("should return an empty string if the text contains only non-numeric characters", () => {
    const text = "abc";
    const expected = "";
    const result = removeNonNumeric(text);
    expect(result).toEqual(expected);
  });

  it("should return the same text if it contains no non-numeric characters", () => {
    const text = "123456789";
    const expected = "123456789";
    const result = removeNonNumeric(text);
    expect(result).toEqual(expected);
  });
});
