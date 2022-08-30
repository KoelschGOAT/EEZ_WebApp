import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TextInput from '../../components/Inputs/TextInput';
import { useGetClient } from '../../services/RequestClients';
import LanguageDisplayer from '../../utils/Language/Language/LanguageDisplayer';
type Props = {};

const EditClient: React.FC<Props> = () => {
  const { id } = useParams<string>();
  const { data } = useGetClient(id);
  const [clientName, setClientName] = useState(data?.pc_name);
  const [clientIpAddress, setClientIpAddress] = useState(
    data?.ip_address
  );
  console.log(data);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) =>
    e.preventDefault();
  console.log('submit');

  return (
    <div className=" flex justify-center items-center mt-6">
      <form className="w-[80%]" onSubmit={onSubmit}>
        <div className="relative z-0 mb-6 w-full group">
          <TextInput
            title="Client Name"
            value={clientName}
            changeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
              setClientName(e.target.value)
            }
            name="pc_name"
          ></TextInput>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6"></div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditClient;
