import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { WebSocketLink } from 'apollo-link-ws';

const client = () => {
    return new ApolloClient({
        link: new WebSocketLink({
            uri: 'wss://author-articles.herokuapp.com/v1/graphql',
            options: {
                reconnect: true
            }
        }),
        cache: new InMemoryCache(),
    });
};

export default client;
