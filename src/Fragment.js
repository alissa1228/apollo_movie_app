import { gql } from '@apollo/client'

export const MovieFragment = gql`
  fragment MovieFragment on movies {
    id
    title
    rating
    description_intro
    language
    medium_cover_image
    genres
  }
`;