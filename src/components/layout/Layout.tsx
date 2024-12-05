import Head from 'next/head';
import Navbar from './Navbar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Blog Post Web App with Next.js and TypeScript" />
            </Head>

            <Navbar />
            <main>{children}</main>
        </>
    );
};

export default Layout;