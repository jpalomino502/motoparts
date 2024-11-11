import React from 'react';
import { toast } from 'react-toastify';

const useAlert = () => {
  const confirmDelete = async (message) => {
    return new Promise((resolve) => {
      const confirmAction = window.confirm(message);
      resolve(confirmAction);
    });
  };

  return { confirmDelete };
};

export default useAlert;
