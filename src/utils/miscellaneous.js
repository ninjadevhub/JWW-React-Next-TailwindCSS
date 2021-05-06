import DOMPurify from 'dompurify';

/**
 * Sanitize markup or text when used inside dangerouslysetInnerHTML
 *
 * @param {string} content Plain or html string.
 *
 * @return {string} Sanitized string
 */
export const sanitize = ( content ) => {
	return process.browser ? DOMPurify.sanitize( content ) : content;
};

export const stripTrailingSlash = path => path.replace(/\/$/, "");

export const isLinkActive = (asPath, path) => {
  if (!asPath || !path) {
    return false
  }

  // TODO: Add functionality to check if link is in the full URL path.
  // e.g. /portfolio /portfolio/cambells-soup

  return asPath === stripTrailingSlash(path)
};

