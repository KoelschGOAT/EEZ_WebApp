import axios from 'axios';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
export function GetAllClients() {
  const queryClient = useQueryClient();
  return <div>getAllClients</div>;
}

export function DeleteClients() {
  const queryClient = useQueryClient();
  return <div>DeleteClients</div>;
}

export function PostClients() {
  const queryClient = useQueryClient();

  return <div></div>;
}
export function usePatchClients({ onClose }) {
  const queryClient = useQueryClient();
  return useMutation(
    ({ pcId, formData }) => {
      console.log(pcId, formData);
      axios.patch(`http://127.0.0.1:8000/api/pc/${pcId}`, formData);
    },

    {
      onSuccess: () => {
        //notification("PC geändert");
        // Invalidate and refetch
        queryClient.invalidateQueries('all-pcs');
        //wait for closing to display success

        setTimeout(() => onClose(), 1000);
      },
      onError: () => {
        /*  setInputError(true);
        setInputErrorMessage(
          'Ein unerwarteter Fehler ist augetreten'
        ); */

        console.log('error');
      },
    }
  );
}
