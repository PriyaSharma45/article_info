import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import client from '../src/graphql/client';
import Main from '../src/components/Main';
function App() {
  return (
    <ApolloProvider client={client()}>
      <div className="App">
        <header className="App-header">
          <Main />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
