import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    url:"https://movieql2.vercel.app" //movieQl 
    //https://movieql2.vercel.app
});

export default client;

//url 필요