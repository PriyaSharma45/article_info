import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { WebSocketLink } from 'apollo-link-ws';

const client = (authToken) => {

    console.log("authToken",authToken)
    const authHeaders = {
        Authorization: `Bearer ${authToken}`
      }

    const anonymousHeaders = {}

    return new ApolloClient({
        link: new WebSocketLink({
            uri: 'wss://author-articles.herokuapp.com/v1/graphql',
            options: {
                reconnect: true,
                connectionParams: {
                    headers: !!authToken ? authHeaders : anonymousHeaders
                 }
            }
        }),
        cache: new InMemoryCache(),
    });
};

export default client;
