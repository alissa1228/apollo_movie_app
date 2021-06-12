import React from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import styled from 'styled-components'
import { gql, useQuery,useMutation } from '@apollo/client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons'
import { visit } from 'graphql'


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
      title
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
        <Recommend>
        {data?.suggestions.map(item=>
        <Suggestions key={item.id}>
          <Link to={`/${item.id}`}>
            {item.title}
          </Link>
        </Suggestions>)}
        </Recommend>
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

  @media screen and (max-width: 768px) {
    width: 80%;
    margin: 0;
  }
`;

const Title = styled.h1`
  font-size: 50px;
  margin-bottom: 15px;
  
  @media screen and (max-width: 768px) {
    font-size: 30px;
  }

`;

const Subtitle = styled.h4`
  font-size: 30px;
  margin-bottom: 10px;

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

const Description = styled.p`
  font-size: 20px;

  @media screen and (max-width: 768px) {
    font-size : 15px;
  }
`;

const Poster = styled.div`
  width: 20%;
  height: 65%;
  border-radius: 10px;
  box-shadow: ${props => props.bg && '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)'};
  background-color: transparent;
  background-image : url(${({bg})=> bg});
  background-size: cover;

  @media screen and (max-width: 768px) {
    display: none;
  }

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
const Recommend = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  position: relative;
  top: 20px;

  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(2,1fr);
  }

`

const Suggestions = styled.div`
  background-color : #fff;
  color : #000;
  text-align : center;
  border-radius : 5px;
  box-shadow: 00 15px 12px rgba(0,0,0,0.22);
  word-break: break-word;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  font-size: 1rem;


  a {
    text-decoration: none;
    color: #000;
   

    :visited {
      color : #000;
    }
  }

  @media screen and (max-width: 1024px) {
    font-size: 0.5rem;
  }

  
`

