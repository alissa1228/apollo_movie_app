import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    url:"http://localhost:4000/" //movieQl 
    //https://movieql2.vercel.app
});

export default client;

//url 필요