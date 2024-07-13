import React from 'react';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useSelector } from 'react-redux';

function GraphConfig() {
  const { token } = useSelector(state => state?.auth?.user);
  
    const httpLink = createHttpLink({
        uri: 'https://api.hrmtests.com/graphql/',
      });
      
      const authLink = setContext((_, { headers }) => {
      
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
          }
        }
      });

    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
      });

}

export default GraphConfig