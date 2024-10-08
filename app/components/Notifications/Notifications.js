import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (message, type = "success") => {
  toast(message, {
    type,
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
