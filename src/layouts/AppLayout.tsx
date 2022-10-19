import type { PropsWithChildren } from 'react';
import Header from '@/components/header/Header';
import PageContainer from '@/components/PageContainer';
import Footer from '@/components/Footer';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <PageContainer>
      <div className='flex h-screen flex-col justify-between'>
        <Header />
        <main className='grow'>{children}</main>
        <Footer />
      </div>
    </PageContainer>
  );
}
