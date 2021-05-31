import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_MOVIES = gql`
  {
    movies {
      id
      medium_cover_image
    }
  }
`;

export default () => {
  const { loading, data } = useQuery(GET_MOVIES);
  console.log('data', data)
  if (loading) {
    return "loading...";
  }
  if (data && data.movies) {
    return data.movies.map(item => <h1 key={item.id}>{item.id}</h1>);
  }
};