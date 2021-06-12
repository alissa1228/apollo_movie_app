import React from "react";
import styled from 'styled-components'
import { Link } from "react-router-dom";


const Movies =  ({ id, bg}) => {
  

  return(
  <Container key={id}>
    <Link to={`/${id}`}>
      <Poster bg={bg}/>
    </Link>
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


