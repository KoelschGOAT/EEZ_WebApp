import React from "react";
import { request, gql } from "graphql-request";
import { useQuery } from "react-query";

const endpoint = "http://localhost:8000/api/graphql";
const PC_QUERY = gql`
  {
    allPcs {
      id
      pcName
      ipAddress
    }
  }
`;

export default function GQL() {
  const { data, isLoading, error } = useQuery("pcs", () => {

    return request(endpoint, PC_QUERY);
  });

  if (isLoading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
    <div>
      <h1>SpaceX Launches</h1>
      <ul>
        {JSON.stringify(data,2,0)}
      </ul>
    </div>
  );
}
