export type Video = {
  id:number;
    video: string;
    screenshot: string;
    title_de: string;
    title_en: string;
    text_de: string;
    text_en: string;
  };
  type Client = {
    id:number;
    pc_name: string;
    ip_address: string;
    is_expo_client: string;
    Videos: Video[];
  };
  export default Client