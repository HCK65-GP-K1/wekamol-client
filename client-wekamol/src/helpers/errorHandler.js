import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const customId = "custom-id-yes";

export const errorHandler = async (error, options) => {
  // console.log(from, "ERROR HANDLER FROM");
  console.log(error, "ERROR HANDLER ERROR");
  // console.log(error.name, "ERROR HANDLER NAME AXIOS");
  // console.log(error.response.data, "ERROR HANDLER MESSAGE");
  // console.log(error.response.status, "ERROR HANDLER STATUS");
  // console.log(error.response.data.message, "ERROR HANDLER");
  // console.log(error.response.status, "ERROR HANDLER");

  let message = error.response?.data?.message || "Unhandled Server Error";
  let status = error.response?.status || "500";
  // let errorName = error.name || "Unhandled Server Error";

  toast.error(`Error ${status}: ${message}`, {
    theme: "dark",
    toastId: customId,
  });
};
