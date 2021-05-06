import { autocomplete } from '@algolia/autocomplete-js';
import { createElement, Fragment, useEffect, useRef } from 'react';
import { render } from 'react-dom';
//import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';

export default function Autocomplete(props) {
  const containerRef = useRef(null);
  const panelContainerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    {/*const querySuggestionsPlugin = createQuerySuggestionsPlugin({
      searchClient,
      indexName: 'wp_posts_resource',
    });*/}

    const search = autocomplete({
      container: containerRef.current,
      panelContainer: panelContainerRef.current,
      //plugins: [querySuggestionsPlugin],
      renderer: { createElement, Fragment },
      render({ children }, root) {
        render(children, root);
      },
      ...props,
    });

    return () => {
      search.destroy();
    };
  }, [props]);

  return (
    <div>
      <div
        className="hidden" 
        ref={containerRef}
      />
      <div ref={panelContainerRef} />
    </div>
  );
}
