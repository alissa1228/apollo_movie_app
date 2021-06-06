import React from "react";
import styled from 'styled-components'
import { Link } from "react-router-dom";



const Movies =  ({ data }) => (
  <Grid>
  {data.map(item=>
  <Container key={item.id}>
    <Link to={`/${item.id}`}>
      <Poster bg={item.medium_cover_image}/>
    </Link>
  </Container>
  )}
  </Grid>
);

export default Movies;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  position: relative;
  top: -50px;
`

const Container = styled.div`
    width:100%
`

const Poster = styled.div`
    background-image : url(${props=> props.bg});
    height: 200px;
`


