import { useState, useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import Accessibility from '../Accessibility/Accessibility';
import Head from 'next/head';
import Seo from '../seo';
import {isEmpty} from 'lodash';
import {sanitize} from '../../utils/miscellaneous';
import useLocalStorageState from '../../utils/useLocalStorageState';
import PropTypes from 'prop-types';

const Layout = ( {data, isPost, children} ) => {
	const [accessibilitySettings, setAccessibilitySettings] = useLocalStorageState('accessibilitySettings', {
		colorContrast: false,
		highlightLinks: false,
		textSize: 0,
		letterSpacing: 0,
		pauseAnimations: false,
		cursorSize: 0,
	});

	useEffect(() => {
		if (accessibilitySettings.textSize > 0) {
			document.body.style.fontSize = `${100 + (accessibilitySettings.textSize * 50)}%`;
		} else {
			document.body.style.fontSize = '100%';
		}
	}, [accessibilitySettings.textSize]);

	const {page, post, posts, header, footer } = data || {};

	// If it does not have either post or page.
	if ( isEmpty( page ) && isEmpty( post ) && isEmpty( posts ) ) {
		//return null;
	}

	const seo = isPost ? ( post?.seo ?? {} ) : ( page?.seo ?? {} );
	const uri = isPost ? ( post?.uri ?? {} ) : ( page?.uri ?? {} );
	console.log(accessibilitySettings)

	return (
		<div className={
			(accessibilitySettings.colorContrast ? 'accessibility-color-contrast' : '') + 
			(accessibilitySettings.highlightLinks ? ' accessibility-highlight-links' : '') +
			(accessibilitySettings.textSize > 0 ? ` accessibility-text-size-${accessibilitySettings.textSize}` : '') +
			(accessibilitySettings.letterSpacing > 0 ? ` accessibility-letter-spacing-${accessibilitySettings.letterSpacing}` : '') +
			(accessibilitySettings.pauseAnimations ? ' accessibility-pause-animations' : '') +
			(accessibilitySettings.cursorSize > 0 ? ` accessibility-cursor-size-${accessibilitySettings.cursorSize}` : '')
		}>
			<Seo seo={seo} uri={uri}/>
			<Head>
				<link rel="shortcut icon" href={header?.favicon}/>
				{seo?.schemaDetails ? (
					<script
						type='application/ld+json'
						className='yoast-schema-graph'
						key='yoastSchema'
						dangerouslySetInnerHTML={{__html: sanitize( seo.schemaDetails )}}
					/>
				) : null}
			</Head>
			<Header header={header}/>
			<div className="md:container pb-24 mx-auto min-h-almost-screen">
				{children}
			</div>
			<Accessibility 
			  accessibilitySettings={accessibilitySettings}
			  setAccessibilitySettings={setAccessibilitySettings}
			/>
			<Footer siteLogoUrl={header?.siteLogoUrl} footer={footer}/>
		</div>
	);
};

Layout.propTypes = {
	data: PropTypes.object,
	isPost: PropTypes.bool,
	children: PropTypes.array
};

Layout.defaultProps = {
	data: {},
	isPost: false,
	children: []
};

export default Layout;


