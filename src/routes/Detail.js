import React from 'react'
import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'

const GET_MOVIE = gql`
  query getMovie($id: Int!) { # Apollo를 위한 부분.
    movie(id: $id) { # 내 서버로 가는 부분
      id
      title
      medium_cover_image
      description_intro
    }
  }
`;


const Detail = () => {

    const { id } = useParams();
    const {loading,result }= useQuery(GET_MOVIE, {variables: { id:+id }});
    console.log(loading, result);
    return(
        <h1>Detail</h1>
    )
    // if (loading) {
    //     return "loading";
    //   }
    // if (result && result.movie) {
    //     return result.movie.title;
    // }
}

export default Detail;
    
