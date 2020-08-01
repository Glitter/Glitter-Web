import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Footer from '@/components/Footer/Footer';
import '@/lib/icons';
import { onRouteChange } from '@/lib/analytics';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@/css/style.css';

const App: React.FC<AppProps> = (props) => {
  const { Component, pageProps, router } = props;

  useEffect(() => {
    router.events.on('routeChangeComplete', onRouteChange);

    return () => {
      router.events.off('routeChangeComplete', onRouteChange);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Revive your desktop - Glitter</title>
        <meta
          key="description"
          name="description"
          content="What if you could use the web technologies to enhance your desktop - that's Glitter"
        />
      </Head>
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default App;
