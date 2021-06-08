import React from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons'

const GET_MOVIE = gql`
  query getMovie($id: Int!) { # Apollo를 위한 부분.
    movie(id: $id) { # 내 서버로 가는 부분
      title
      medium_cover_image
      language
      rating
      description_intro
    }suggestions(id:$id){
      id
      title
      medium_cover_image
  }
  }
`;


const Detail = () => {

    const history = useHistory();
    const { id } = useParams();
    const {loading, data }= useQuery(GET_MOVIE, {variables: { id: +id }});
    console.log('data', data);

    return(
      // <Container>
      //   <GoBack>
      //   <FontAwesomeIcon onClick={history.goBack} icon={faArrowAltCircleLeft} style={IconStyle}/>
      //   </GoBack>
      //   <MovieCon>
      //     <Column>
      //     <Title>{loading? 'Loading....' : data.movie.title}</Title>
      //     {!loading && 
      //   <>
      //   <Subtitle>{data?.movie?.language} · {data?.movie?.rating}</Subtitle>
      //   <Description>{data?.movie?.description_intro} </Description>
      //   </>
      //   }
      //     </Column>
      //     <Poster bg={data?.movie?.medium_cover_image}/>
      //   </MovieCon>
      //   <Recommend>
      //     {data?.suggestions.map(item=>
      //     <Link to={`/${item.id}`}>
      //     <Suggestions key={item.id}>
      //       {item.title}
      //     </Suggestions>
      //     </Link>
      //     )
      //     }
      //   </Recommend>
      // </Container>
      <Container>
        <GoBack>
         <FontAwesomeIcon onClick={history.goBack} icon={faArrowAltCircleLeft} style={IconStyle}/>
        </GoBack>
      <Content>
      <Column>
        <Title>{loading? 'Loading....' : data.movie.title}</Title>
        {!loading && 
        <>
        <Subtitle>{data?.movie?.language} · {data?.movie?.rating}</Subtitle>
        <Description>{data?.movie?.description_intro} </Description>
        <Recommend>
        {data?.suggestions.map(item=>
        <Link to={`/${item.id}`} style={{textDecoration:'none'}}>
        <Suggestions key={item.id}>
          {item.title}
        </Suggestions>
        </Link>
        )
        }
      </Recommend>
        </>
        }
      </Column>
      <Poster bg={data?.movie?.medium_cover_image}></Poster>
      {/* {data?.suggestions.map(s=><h1 key={s.id}>{s.id}</h1>)} */}
      </Content>
    </Container>
    )
}

export default Detail;


const Container = styled.div`
  font-family: 'Roboto Condensed', sans-serif;
  color : #fff;
`
    
const Content = styled.div`
  //background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  background: linear-gradient(-45deg, #59c173, #a17fe0, #5d26c1);
  width: 100%;
  height: 100vh;
  display: flex;
  //flex-direction: column;
  justify-content: space-around; 
  //moiveCon, Recommend의 간격을 조정.
  align-items : center;
  
`;

const GoBack = styled.div`
  width: 100%;
  height: 50px;
  background-color : #000;
  display: flex;
  align-items: center;
  
`

const IconStyle ={
  cursor:'pointer',
  fontSize:'25px',
  position: 'relative',
  left: '10px'
}

// const MovieCon = styled.div`
//   display: flex;
//   height: 100%;
//   justify-content: space-around;
//   align-items: center;
// `

const Column = styled.div`
  margin-left: 10px;
  width:60%;
`;


const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 25px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 20px;
`;


const Poster = styled.div`
  width: 25%;
  height: 65%;
  border-radius: 10px;
  box-shadow: ${props => props.bg && '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)'};
  background-color: transparent;
  background-image : url(${({bg})=> bg});
  background-size: cover;
  background-position: center center
`;

const Recommend = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  position: relative;
  top: 20px;
`

const Suggestions = styled.div`
  background-color : #fff;
  color : #000;
  text-align : center;
  border-radius : 5px;
  box-shadow: 00 15px 12px rgba(0,0,0,0.22);
  word-break: break-word;
  padding: 5px;
`
