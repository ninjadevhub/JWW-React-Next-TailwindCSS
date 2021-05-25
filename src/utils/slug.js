import {isEmpty} from 'lodash';

export const FALLBACK = 'blocking';

export const isCustomPageUri = ( uri ) => {
	const pagesToExclude = [
		'/',
		'/blog/',
		'/news/',
	];

	const pagesToExclude2 = [
		/^\/topic\//,
		/^\/committee\//,
	];

	return pagesToExclude.includes(uri) || pagesToExclude2.some(re => re.test(uri));
};

export const handleRedirectsAndReturnData = ( defaultProps, data, errors, field, isPreview = false, loginRedirectURL = '' ) => {

	if ( isPreview && null === data?.[field] ) {
		return {
			redirect: {
				destination: loginRedirectURL || '/',
				statusCode: 307
			}
		};
	}

	const isTaxonomyPage = ['topic', 'committee'].includes(field);
	if ( isEmpty( data ) && !isTaxonomyPage) {
		return {
			/*redirect: {
				destination: '/503',
				statusCode: 301
			}*/
			notFound: true,
		};
	}

	if ( field && isEmpty( data?.[field] ) && !isTaxonomyPage) {
		return {
			// returns the default 404 page with a status code of 404
			notFound: true
		};
	}

	return defaultProps;
};
