import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Provider from '@/components/provider/Provider';
import Layout from '@/components/layout/Layout';

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <Provider>
            <QueryClientProvider client={queryClient}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </QueryClientProvider>
        </Provider>
    );
};

export default MyApp;