import DOMPurify from 'dompurify';

/**
 * Sanitize markup or text when used inside dangerouslysetInnerHTML
 *
 * @param {string} content Plain or html string.
 *
 * @return {string} Sanitized string
 */
export const sanitize = (content) => {
  return process.browser ? DOMPurify.sanitize(content) : content;
};

export const stripTrailingSlash = (path) => path.replace(/\/$/, '');

export const isLinkActive = (asPath, path) => {
  if (!asPath || !path) {
    return false;
  }

  // TODO: Add functionality to check if link is in the full URL path.
  // e.g. /portfolio /portfolio/cambells-soup

  return asPath === stripTrailingSlash(path);
};

export const convertAmpersands = (html) => html?.replace(/&amp;/g, '&');

export const getYears = (start, end) => {
  const years = [];
  for (let i = start; i <= end; i++) {
    years.push(i);
  }

  return years;
};

export const cycle3Colors = (i) =>
  ['brand-purple', 'brand-orange', 'brand-blue'][i % 3];

export const findYearSlideIndex = (data, name, year) => {
  let index = 0;
  for (let i = 0; i < data.length; i++) {
    if (+data[i]?.[name]?.year === +year) {
      return index;
    }

    index++;
    for (let j = 0; j < data[i]?.[name]?.boxes?.length; j++) {
      index++;
    }
  }

  return -1;
};

export const getTotalYearSlidesCount = (data, name) => {
  let index = 0;
  for (let i = 0; i < data.length; i++) {
    index++;
    for (let j = 0; j < data[i]?.[name]?.boxes?.length; j++) {
      index++;
    }
  }

  return index;
};

export const getSlidesCountForYear = (data, name, year) => {
  let index = 0;
  for (let i = 0; i < data.length; i++) {
    if (+data[i][name]?.year === +year) {
      index++;
      for (let j = 0; j < data[i]?.[name]?.boxes?.length; j++) {
        index++;
      }
    }
  }

  return index;
};
