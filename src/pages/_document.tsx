// import { GlobalProvider, useGlobalContext } from '@/contexts/globalContext';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  // const { globalState } = useGlobalContext();
  // <GlobalProvider>
  //   `${globalState.bodyScroll ? 'overflow-auto' : 'overflow-hidden'}`
  // </GlobalProvider>

  return (
    <Html lang='en' className='scroll-smooth'>
      <Head>
        <meta name='theme-color' media='(prefers-color-scheme: light)' content='#fff' />
        <meta name='theme-color' media='(prefers-color-scheme: dark)' content='#000' />
      </Head>
      <body className='bg-white text-black antialiased dark:bg-gray-900 dark:text-white'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
