import React from "react";
import { gql, useQuery } from "@apollo/client"
import styled from 'styled-components'
import Movies from '../components/Movies'

//query에 variable이 하나도 없을 때 && 영화 전체를 가져올 때
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
        <Title>Welcome to 'Apollo_Movie_App!'</Title>
        <SubTitle>Find your Movie!</SubTitle>
      </Header>
      {/* content 부분. 전체적으로 grid를 뿌려주고 그 안에 영화들을 뿌려줌 */}
      {loading && <Loading>Loading...</Loading>}
      {!loading && data.movies && 
      <Grid> 
      <Movies data={data.movies}/>
      </Grid>
      }
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
font-family: 'Roboto Condensed', sans-serif;
  width: 100%;
  height: 400px;
  text-align: center;
  background: linear-gradient(to right, #bc4e9c, #f80759);
  color : #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  // &:hover {
  // color : linear-gradient(#FFFFFF, #FFEFBA); 
  // -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent;
  // }


`

const Title = styled.h1`
  font-size: 60px;
  font-weight: 400;
  margin-bottom : 20px;
`

const SubTitle = styled.h3`
  font-size: 35px;
  margin-top: 10px;
`

const Loading = styled.div`
font-size: 18px;
opacity: 0.5;
font-weight: 500;
margin-top: 10px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 80%;
  position: relative;
  top: -50px;
`
