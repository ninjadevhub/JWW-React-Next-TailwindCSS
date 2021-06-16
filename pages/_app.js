import { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import WordPressProvider from '../src/components/common/WordPressProvider';
import client from '../src/apollo/client';

import Router from 'next/router';
import NProgress from 'nprogress';
import '../src/styles/index.scss';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const { menus, sitewideSettings, algolia, ...passThruProps } = pageProps?.data || {};
  const [wp] = useState({
    algolia: {
      indexName: algolia?.indexName,
    },
    menus: menus,
    sitewideSettings: sitewideSettings,
  });

  return (
    <ApolloProvider client={client}>
      <WordPressProvider value={wp}>
        <Component {...pageProps} />
      </WordPressProvider>
    </ApolloProvider>
  );
}

export default MyApp;
