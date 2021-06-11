import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri:"https://movieql2.vercel.app", //url-> uri로 수정
    resolvers: {
        //boolean 함수를 갖는 movie 만들었음.
        Movie: {
            isLiked: () => false
        },
        Mutation: { 
            likeMovie: (_, { id }, {cache}) => {
                cache.modify({
                id: `Movie:${id}`,
                fields: {
                    isLiked: () => true,
                    },
                });
            }
        }
    }
});

export default client;

//url 필요