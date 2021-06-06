import React from "react";
import styled from 'styled-components'
import { Link } from "react-router-dom";



const Movies =  ({ data }) => (
  <>
  {data.map(item=>
  <Container key={item.id}>
    <Link to={`/${item.id}`}>
      <Poster bg={item.medium_cover_image}/>
    </Link>
  </Container>
  )}
</>
);

export default Movies;


const Container = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
  overflow: hidden;
  border-radius: 10px;
`

const Poster = styled.div`
    background-image : url(${props=> props.bg});
    height: 300px;
    background-size: cover;
    background-position: center center
`


