import React, { useState, memo } from 'react';
//import PropTypes from 'prop-types';
import { connectAutoComplete } from 'react-instantsearch-dom';
//import AutoSuggest from 'react-autosuggest';

function AutoComplete({
  hits,
  searchCurrentRefinement,
  searchRefine,
  textInputRef,
  //searchMode,
  //setQuery,
}) {
  const [suggestionsAreVisible, setSuggestionsVisibility] = useState(false);
  //const inputRef = useRef(null);

  return (
    <div
      className="ais-SearchBox relative"
    >
      <form
        noValidate=""
        className="ais-SearchBox-form"
        action=""
        role="search"
      >
        <input
          className="ais-SearchBox-input"
          ref={textInputRef}
          type="search"
          placeholder="Search here…"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          required=""
          maxLength="512"
          value={searchCurrentRefinement}
          onFocus={() => setSuggestionsVisibility(!!searchCurrentRefinement)}
          onChange={(event) => {
            const { value } = event.currentTarget;
            //let newQuery;
            /*if (searchMode === 'Exact') {
              newQuery = `"${value?.replace(/"+/g, '') || ''}"`;
            } else {
              newQuery = value?.replace(/"+/g, '') || '';
            }*/

            searchRefine(value ?? '');
            setSuggestionsVisibility(!!value);
            //setQuery(value);
          }}
          onBlur={(event) => {
            if (!(event.relatedTarget?.classList?.contains('suggestion'))) {
              setSuggestionsVisibility(false);
            }
          }}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              setSuggestionsVisibility(false);
              //searchRefine(value);
            }
          }}
        />
        <button
          type="button"
          title="Submit your search query."
          className="ais-SearchBox-submit"
        >
          <svg
            className="ais-SearchBox-submitIcon"
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 40 40"
          >
            <path d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"></path>
          </svg>
        </button>
        <button
          type="reset"
          title="Clear the search query."
          className="ais-SearchBox-reset"
          hidden
        >
          <svg
            className="ais-SearchBox-resetIcon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width="10"
            height="10"
          >
            <path d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z"></path>
          </svg>
        </button>
      </form>
      <ul
        className={`w-full absolute bg-white shadow-md${
          suggestionsAreVisible ? '' : ' hidden'
        }`}
        style={{top: 40, left: 0, zIndex: 10}}
      >
        {hits?.map((hit) => (
          <li
            className="suggestion px-6 py-2"
            key={hit.post_id}
            onClick={() => {
              searchRefine(hit.post_title);
              setSuggestionsVisibility(false);
            }}
            tabindex="0"
          >
            {hit.post_title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(connectAutoComplete(AutoComplete));
