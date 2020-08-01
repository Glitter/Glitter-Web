import React from 'react';
import { NextPage, NextPageContext } from 'next';
import { getSnapshot } from 'mobx-state-tree';
import { initializeStore } from '@/store';
import { StoreProvider } from '@/store/hooks';

const withStore = () => {
  return (Page: any): NextPage => {
    const withStorePage: NextPage = ({ initialState, ...props }: any) => {
      const isServer = typeof window === 'undefined';
      const store = initializeStore(isServer, initialState);

      return (
        <StoreProvider store={store}>
          <Page {...props} />
        </StoreProvider>
      );
    };

    withStorePage.displayName = 'WithStore';

    withStorePage.getInitialProps = async (ctx: NextPageContext) => {
      const isServer = typeof window === 'undefined';
      const store = initializeStore(isServer);

      let pageProps = {} as any;

      if (Page.getInitialProps) {
        pageProps = await Page.getInitialProps(ctx as any);
      }

      return {
        ...pageProps,
        initialState: getSnapshot(store),
      };
    };

    return withStorePage;
  };
};

export default withStore;
