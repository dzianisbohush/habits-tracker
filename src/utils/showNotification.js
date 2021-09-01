import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showNotification = (
  message,
  type = 'info',
  timeOut = 1,
) => {
  toast[type](message, {
    autoClose: timeOut * 1000,
  });
};
