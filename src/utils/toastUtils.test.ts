import { toast } from "react-toastify";

import { ActionResponse } from "~/types/actionResponse";

import { showToast } from "./toastUtils";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("showToast", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show success toast when action is successful", () => {
    const actionResponse: ActionResponse = {
      success: true,
      message: "Success message",
    };

    showToast(actionResponse);

    expect(toast.success).toHaveBeenCalledWith("Success message");
    expect(toast.error).not.toHaveBeenCalled();
  });

  it("should show error toast when action fails", () => {
    const actionResponse: ActionResponse = {
      success: false,
      message: "Error message",
    };

    showToast(actionResponse);

    expect(toast.error).toHaveBeenCalledWith("Error message");
    expect(toast.success).not.toHaveBeenCalled();
  });
});
