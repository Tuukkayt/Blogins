import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import React from 'react'
import { ApolloProvider } from '@apollo/client/react';
import {ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({ 
    uri: "http://localhost:4000/graphql", 
    cache:  new InMemoryCache(),
    credentials: 'include', 
});

import theme from '../theme'

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
        <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
            options={{
            useSystemColorMode: true,
            }}
        >
            <Component {...pageProps} />
        </ColorModeProvider>
        </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
