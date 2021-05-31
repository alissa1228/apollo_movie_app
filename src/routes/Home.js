import React from "react";
import { gql, useQuery } from "@apollo/client"
import styled from 'styled-components'
import Movie from '../components/Movie'

const GET_MOVIES = gql`
  {
    movies {
      id
      medium_cover_image
    }
  }
`;

const Home = () => {
  const { loading, data } = useQuery(GET_MOVIES);
  console.log('data', data)

  return (
    <Container>
      <Header>
        <h1>Apollo_Movie_App</h1>
        <h2>Practicing GraphQL with Apollo!</h2>
      </Header>
      {loading && <Loading>Loading...</Loading>}
      {/* {!loading && data.movies && data.movies.map(item=> 
      <Movie key={item.id} id={item.id}>{item.id}</Movie>)} */}
      {!loading && data.movies && 
      <Movie data={data.movies}/>}
    </Container>
  )

};

export default Home;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`

const Header = styled.header`
  width: 100%;
  text-align: center;
  background: linear-gradient(to right, #bc4e9c, #f80759);
  color : #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > h1 {
    font-size: 60px;
    font-weight: 600;
    margin-bottom : 10px;
  }

  > h2 {
    font-size: 35px;
  }

  // &:hover {
  // color : linear-gradient(#FFFFFF, #FFEFBA); 
  // -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent;
  // }


`

const Loading = styled.div`
font-size: 18px;
opacity: 0.5;
font-weight: 500;
margin-top: 10px;
`

