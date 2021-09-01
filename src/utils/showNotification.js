import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showNotification = (message, type = 'info') => {
  toast[type](message, {
    autoClose: 3000,
  });
};
