import type { AppProps } from 'next/app';
import '$/globals.css';
import { ThemeProvider } from 'next-themes';
import AppLayout from '@/layouts/AppLayout';
import siteMetadata from '@/config/siteMetadata';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute='class' defaultTheme={siteMetadata.theme}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ThemeProvider>
  );
};

export default MyApp;
