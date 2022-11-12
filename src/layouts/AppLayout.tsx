import type { PropsWithChildren } from 'react';
import Header from '@/components/header/Header';
import AppContainer from '@/containers/AppContainer';
import Footer from '@/components/Footer';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <AppContainer>
      <div className='flex min-h-screen flex-col justify-between'>
        <Header />
        <div className='flex grow'>{children}</div>
        <Footer />
      </div>
    </AppContainer>
  );
}
