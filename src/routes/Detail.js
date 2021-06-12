import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { gql, useQuery,useMutation } from '@apollo/client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons'


const GET_MOVIE = gql`
  query getMovie($id: Int!) { # Apollo를 위한 부분.
    movie(id: $id) { # 내 서버로 가는 부분
      id
      title
      medium_cover_image
      language
      rating
      description_intro
      isLiked @client
    }suggestions(id:$id){
      id
      medium_cover_image
  }
  }
`;

const LIKE_MOVIE = gql`
  mutation toggleLikeMovie($id:Int!, $isLiked: Boolean!){
    toggleLikeMovie(id:$id, isLiked: $isLiked) @client
  }
`

const Detail = ({isLiked}) => {

    const history = useHistory();
    const { id } = useParams();
    const {loading, data }= useQuery(GET_MOVIE, {variables: { id: +id }});
    console.log('data', data);


    const [toggleMovie] = useMutation(LIKE_MOVIE, { variables: {id: +id},isLiked});

    return(
    <>
      <GoBack>
      <FontAwesomeIcon onClick={history.goBack} icon={faArrowAltCircleLeft} style={IconStyle}/>
     </GoBack>
      <Container>
      <Column>
        <Title>{loading? 'Loading....' : data.movie.title}</Title>
        {!loading && 
        <>
         <LikeBtn onClick={isLiked ? null : toggleMovie}>👍 Like</LikeBtn>
        <Subtitle>{data?.movie?.language} · {data?.movie?.rating} {data.movie.isLiked ? "💖":"💔"}</Subtitle>
        <Description>{data?.movie?.description_intro} </Description>
        {data?.suggestions.map(s=><h1 key={s.id}>{s.id}</h1>)}
        </>
        }
      </Column>
      <Poster bg={data?.movie?.medium_cover_image}></Poster>
    </Container>
    </>
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
  width:60%;
`;

const Title = styled.h1`
  font-size: 50px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 30px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 20px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  border-radius: 10px;
  box-shadow: ${props => props.bg && '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)'};
  background-color: transparent;
  background-image : url(${({bg})=> bg});
  background-size: cover;
  background-position: center center
`;

const GoBack = styled.div`
  width: 100%;
  height: 40px;
  background-color : #000;
  display: flex;
  align-items: center;
  
`

const IconStyle ={
  cursor:'pointer',
  fontSize:'25px',
  position: 'relative',
  left: '10px',
  color: 'white'
}

const LikeBtn = styled.button`
  background: #f3f3f3;
  color: #000;
  border: 0;
  border-radius: 10px;
  width: 60px;
  height: 30px;
  cursor : pointer;
`