import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import fetchData from './RequestClients';

export function useGetCurrentClientVideos() {
  return useQuery('current-pc-videos', () =>
    fetchData(`http://127.0.0.1:8000/api/current-pc-videos`)
  );
}

export function useGetAllVideos() {
  return useQuery('all-videos', () =>
    fetchData(`http://127.0.0.1:8000/api/all-videos`)
  );
}
export function usePostVideos({ config }) {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ formData }) => {
      await axios.post(
        `http://127.0.0.1:8000/api/all-videos`,
        formData
      );
    },
    {
      onSuccess: () => {
        //notification("PC geändert");
        // Invalidate and refetch
        queryClient.invalidateQueries('all-videos');
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
export function usePatchVideos({ config }) {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ videoId, formData }) => {
      await axios.patch(
        `http://127.0.0.1:8000/api/video/${videoId}`,
        formData
      );
    },

    {
      onSuccess: () => {
        //notification("PC geändert");
        // Invalidate and refetch
        queryClient.invalidateQueries('all-videos');
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

export function useDeleteVideos({ config }) {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ pcId }) => {
      await axios.delete(`http://127.0.0.1:8000/api/pc/${pcId}`);
    },

    {
      onSuccess: () => {
        //notification("PC geändert");
        // Invalidate and refetch
        queryClient.invalidateQueries('all-videos');
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
