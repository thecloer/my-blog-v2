import type { AppProps } from 'next/app';
import '$/globals.css';
import AppLayout from '@/layouts/AppLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}

export default MyApp;
