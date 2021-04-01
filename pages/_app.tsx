import Layout from 'components/Layout';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from 'context/AuthProvider';
import type { AppProps } from 'next/app';
import 'styles/globals.css';

function MyApp({ Component, pageProps }: AppProps ) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
