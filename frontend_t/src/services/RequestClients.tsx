import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';
import Client from './types';
const fetchData = async (url: string) => {
  const response = await axios.get(url);
  return response;
};
export default fetchData;
/* export function useGetAllClients() {
  return useQuery(['all-pcs'], () =>
    fetchData(`http://127.0.0.1:8000/api/all-pcs`)
  );
} */
export const getVideoValidator = z.object({
  id: z.number(),
  video: z.string(),
  screenshot: z.string(),
  published: z.string(),
  title_de: z.string().max(200),
  title_en: z.string().max(200),
  text_de: z.string().max(2000),
  text_en: z.string().max(2000),
});
export const getClientValidator = z.object({
  id: z.number(),
  pc_name: z.string(),
  ip_address: z
    .string()
    .regex(
      new RegExp(
        '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
      )
    ),
  is_expo_client: z.boolean(),
  Videos: z.array(getVideoValidator),
});

export function useGetCurrentClient() {
  return useQuery(['current-pc'], async () => {
    const res = await (
      await fetch(`http://127.0.0.1:8000/api/current-pc`)
    ).json();
    return getClientValidator.parse(res);
  });
}
export function useGetAllClients() {
  return useQuery<Array<Client>>(['all-pcs'], async () => {
    const res = await (
      await fetch(`http://127.0.0.1:8000/api/all-pcs`)
    ).json();
    return res;
  });
}
export function useGetClient(id: string | undefined) {
  return useQuery(['all-pcs'], async () => {
    const res = await (
      await fetch(`http://127.0.0.1:8000/api/pc/${id}`)
    ).json();
    return getClientValidator.parse(res);
  });
}
interface configInterface {
  config: { onSuccess: () => void; onError: () => void };
}

interface mutationInterface {
  clientId: number;
  formData: Client;
}
export function usePatchClients({ config }: configInterface) {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ clientId, formData }: mutationInterface) => {
      await axios.patch(
        `http://127.0.0.1:8000/api/pc/${clientId}`,
        formData
      );
    },

    {
      onSuccess: () => {
        //notification("PC geändert");
        // Invalidate and refetch
        queryClient.invalidateQueries(['current-pc-videos']);
        //wait for closing to display success
        console.log('success');
        config.onSuccess();
      },
      onError: () => {
        config.onError();
        console.log('error');
      },
    }
  );
}
interface deleteClient {
  clientId: number;
}
export function useDeleteClients({ config }: configInterface) {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ clientId }: deleteClient) => {
      await axios.delete(`http://127.0.0.1:8000/api/pc/${clientId}`);
    },

    {
      onSuccess: () => {
        //notification("PC geändert");
        // Invalidate and refetch
        queryClient.invalidateQueries([
          'current-pc-videos',
          'all-pcs',
        ]);
        //wait for closing to display success
        console.log('success');
        config.onSuccess();
      },
      onError: () => {
        config.onError();
        console.log('error');
      },
    }
  );
}
/* 
export function usePostClients({ config }) {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ formData }) => {
      await axios.post(`http://127.0.0.1:8000/api/all-pcs`, formData);
    },
    {
      onSuccess: () => {
        //notification("PC geändert");
        // Invalidate and refetch
        queryClient.invalidateQueries('all-pcs');
        //wait for closing to display success
        config.onSuccess();
      },
      onError: () => {
        config.onError();
        console.log('error');
      },
    }
  );
}

export function usePatchClients({ config }) {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ pcId, formData }) => {
      await axios.patch(
        `http://127.0.0.1:8000/api/pc/${pcId}`,
        formData
      );
    },

    {
      onSuccess: () => {
        //notification("PC geändert");
        // Invalidate and refetch
        queryClient.invalidateQueries('all-pcs');
        //wait for closing to display success
        config.onSuccess();
      },
      onError: () => {
        config.onError();
        console.log('error');
      },
    }
  );
}
export function useDeleteClients({ config }) {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ pcId }) => {
      await axios.delete(`http://127.0.0.1:8000/api/pc/${pcId}`);
    },

    {
      onSuccess: () => {
        //notification("PC geändert");
        // Invalidate and refetch
        queryClient.invalidateQueries('all-pcs');
        //wait for closing to display success
        config.onSuccess();
      },
      onError: () => {
        config.onError();
        console.log('error');
      },
    }
  );
}
 */
