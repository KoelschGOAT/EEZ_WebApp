import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetClient } from '../../services/RequestClients';
type Props = {};

const EditClient: React.FC<Props> = () => {
  const { id } = useParams<string>();

  const { data } = useGetClient(id);
  console.log(data);
  return <div>{JSON.stringify(data)}</div>;
};

export default EditClient;
