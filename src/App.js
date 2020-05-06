import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import client from '../src/graphql/client';
import Main from '../src/components/Main';
import { useAuth0 } from "../src/components/AuthWrapper";

function App() {

  const [token, setToken] = React.useState(null)
  const {
    isAuthenticated,
    getIdTokenClaims
  } = useAuth0();

  React.useEffect(() => {
    const getToken = async () => {
      try {
        const token = await getIdTokenClaims();
        setToken(token.__raw)
      }catch(e) {
        console.log(e)
      }
    }
    if(isAuthenticated) {
      getToken()
    }
  }, [isAuthenticated])

  return (
    <ApolloProvider client={client(token)}>
      <div className="App">
        <header className="App-header">
          <Main />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
