import { ToastContainer, toast } from 'react-toastify';

export const SuccessMessage = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT
  });
  }
  export const ErrorMessage = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT
  });
  }
  