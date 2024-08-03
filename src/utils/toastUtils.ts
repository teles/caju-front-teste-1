import { toast } from "react-toastify";
import { ActionResponse } from "~/types/actionResponse";

export const showToast = (actionResponse: ActionResponse) => {
  if (actionResponse.success) {
    toast.success(actionResponse.message);
  } else {
    toast.error(actionResponse.message);
  }
};
