import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Provider from '@/components/provider/Provider';
import Layout from '@/components/layout/Layout';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <Provider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
};

export default MyApp;