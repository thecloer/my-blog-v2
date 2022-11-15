import type { NextPage } from 'next';
import AppWidthContainer from '@/containers/AppWidthContainer';

const NotFoundPage: NextPage = () => {
  return (
    <AppWidthContainer>
      <h1 className='text-2xl font-bold'>Not Found</h1>
    </AppWidthContainer>
  );
};

export default NotFoundPage;
