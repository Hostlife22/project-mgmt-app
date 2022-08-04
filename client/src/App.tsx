import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Client from './components/Client';
import Header from './components/Header';
import Modal from './components/Modal';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <Modal />
          <Client />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
