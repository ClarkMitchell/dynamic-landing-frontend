import { ApolloProvider } from "@apollo/react-hooks";
import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import "../styles/globals.css";

export const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }) {
  return (
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
  );
}

export default MyApp;
