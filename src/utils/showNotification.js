import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showNotification = (
  message,
  type = 'info',
  timeOut = 3,
) => {
  toast[type](message, {
    autoClose: timeOut * 1000,
  });
};
