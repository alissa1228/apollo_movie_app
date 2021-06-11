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
      isLiked @client
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
      {!loading  && 
      <Grid> 
        {data?.movies?.map(item=>
        <Movies key={item.id} id={item.id} isLiked={item.isLiked} bg={item.medium_cover_image}/>
        )}
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
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  //height: 45vh;
  height: 70vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

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
  width: 60%;
  position: relative;
  top: -30px;
`
