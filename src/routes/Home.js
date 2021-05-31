import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

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
    return data.movies.map(item => <h1>{item.id}</h1>);
  }
};