import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { gql, useQuery } from '@apollo/client'

const GET_MOVIE = gql`
  query getMovie($id: Int!) { # Apollo를 위한 부분.
    movie(id: $id) { # 내 서버로 가는 부분
      title
      medium_cover_image
      language
      rating
      description_intro
    }
  }
`;


const Detail = () => {

    const { id } = useParams();
    const {loading, data }= useQuery(GET_MOVIE, {variables: { id:+id }});


    return(
      <Container>
      <Column>
        <Title>{loading? 'Loading....' : data.movie.title}</Title>
        <Subtitle>English · 4.5</Subtitle>
        <Description>lorem ipsum lalalla </Description>
      </Column>
      <Poster></Poster>
    </Container>
    )
}

export default Detail;
    
const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
`;
