import type { PropsWithChildren } from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/Footer';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className='flex min-h-screen flex-col justify-between'>
      <Header />
      <main className='grow'>{children}</main>
      <Footer />
    </div>
  );
}
