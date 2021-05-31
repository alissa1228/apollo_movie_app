import React from "react";
import styled from 'styled-components'
import { Link } from "react-router-dom";


const Movie =  ({ data }) => (
  <>
  {data.map(item=>
  <div key={item.id}>
    <Link to={`/${item.id}`}>
      {item.id}
    </Link>
  </div>

  )}
  </>
  // <div>
  //   <Link to={`/${id}`}>{id}</Link>
  // </div>
);

export default Movie;



