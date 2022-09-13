import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';
import fetchData from './RequestClients';
import { Video } from './types';
export const getVideoValidator = z.object({
  id: z.number().optional(),
  video: z.string(),
  screenshot: z.string(),
  published: z.string(),
  title_de: z.string().max(200),
  title_en: z.string().max(200),
  text_de: z.string().max(2000),
  text_en: z.string().max(2000),
});

export function useGetCurrentClientVideos() {
  return useQuery<Array<Video>>(['current-pc-videos'], async () => {
    const res = await (
      await fetch(
        `http://${
          import.meta.env.VITE_SERVER_ADRRESS
        }/api/current-pc-videos`
      )
    ).json();
    return res;
  });
}
export function useGetAllVideos() {
  return useQuery<Array<Video>>(['all-videos'], async () => {
    const res = await (
      await fetch(
        `http://${import.meta.env.VITE_SERVER_ADRRESS}/api/all-videos`
      )
    ).json();

    return res;
  });
}

interface mutationInterface {
  videoId: number;
  formData: FormData;
  setProgress: (val: number) => void;
}
interface configInterface {
  config: { onSuccess: () => void; onError: () => void };
}

export function usePatchVideos({ config }: configInterface) {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ videoId, formData, setProgress }: mutationInterface) => {
      await axios.patch(
        `http://${
          import.meta.env.VITE_SERVER_ADRRESS
        }/api/video/${videoId}`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const totalLength = progressEvent.lengthComputable
              ? progressEvent.total
              : progressEvent.target.getResponseHeader(
                  'content-length'
                ) ||
                progressEvent.target.getResponseHeader(
                  'x-decompressed-content-length'
                );

            if (totalLength !== null) {
              setProgress(
                Math.round((progressEvent.loaded * 100) / totalLength)
              );
            }
          },
        }
      );
    },

    {
      onSuccess: () => {
        //notification("PC geändert");
        // Invalidate and refetch
        queryClient.invalidateQueries([
          'all-videos',
          'current-client-videos',
        ]);
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
interface deleteInterface {
  videoId: number;
}
export function useDeleteVideos({ config }: configInterface) {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ videoId }: deleteInterface) => {
      await axios.delete(
        `http://${
          import.meta.env.VITE_SERVER_ADRRESS
        }/api/video/${videoId}`
      );
    },

    {
      onSuccess: () => {
        //notification("PC geändert");
        // Invalidate and refetch
        queryClient.invalidateQueries(['all-videos']);
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

export type postVideo = {
  video: File;
  screenshot: File;

  title_de: string;
  title_en: string;
  text_de: string;
  text_en: string;
};
interface PostClients {
  formData: FormData;
  setProgress: (val: number) => void;
}
export function usePostVideos({ config }: configInterface) {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ formData, setProgress }: PostClients) => {
      await axios.post(
        `http://${
          import.meta.env.VITE_SERVER_ADRRESS
        }/api/all-videos`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const totalLength = progressEvent.lengthComputable
              ? progressEvent.total
              : progressEvent.target.getResponseHeader(
                  'content-length'
                ) ||
                progressEvent.target.getResponseHeader(
                  'x-decompressed-content-length'
                );

            if (totalLength !== null) {
              setProgress(
                Math.round((progressEvent.loaded * 100) / totalLength)
              );
            }
          },
        }
      );
    },
    {
      onSuccess: () => {
        //notification("PC geändert");
        // Invalidate and refetch
        queryClient.invalidateQueries(['all-videos']);
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
