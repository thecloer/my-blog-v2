import Script from 'next/script';
import siteMetadata from '@/config/siteMetadata';

const GoogleAnalytics = () => {
  return (
    <>
      <Script strategy='afterInteractive' src={`https://www.googletagmanager.com/gtag/js?id=${siteMetadata.ga_id}`} />
      <Script
        id='google-analytics'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${siteMetadata.ga_id}', {
                  page_path: window.location.pathname,
                  });
                  `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
