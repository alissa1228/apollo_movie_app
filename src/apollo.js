import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri:"https://movieql2.vercel.app" //url-> uri로 수정
});

export default client;

//url 필요