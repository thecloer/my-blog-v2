import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import AppLayout from '@/layouts/AppLayout';
import siteMetadata from '@/config/siteMetadata';
import '$/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute='class' defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ThemeProvider>
  );
};

export default MyApp;
