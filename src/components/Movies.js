import React from "react";
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const LIKE_MOVIE = gql`
  mutation likeMovie($id:Int!){
    likeMovie(id:$id) @client
  }
`

const Movies =  ({ id, bg, isLiked }) => {
  const [like] = useMutation(LIKE_MOVIE, { variables: {id: +id}});

  return(
  <Container key={id}>
    <Link to={`/${id}`}>
      <Poster bg={bg}/>
    </Link>
    <button onClick={isLiked ? null : like}>{isLiked? "Unlinke": "Like"}</button>
  </Container>
  )
  };

export default Movies;


const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  //border-radius: 10px;
  
`

const Poster = styled.div`
    background-image : url(${props=> props.bg});
    height: 300px;
    box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
    background-size: cover;
    background-position: center center;
    border-radius: 10px;
`


