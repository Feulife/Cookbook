import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

import GlobalStyle from './components/GlobalStyle';
import Pages from './pages/index.js';

const client = new ApolloClient({
  uri: 'http://localhost:5000',
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
      
    </ApolloProvider>
  );
}

export default App;
