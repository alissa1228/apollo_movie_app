import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    url:"http://localhost:4000/"
});

export default client;

//url 필요