import { useState, useEffect } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import Accessibility from '../Accessibility/Accessibility';
import Subscribe from '../Subscribe/Subscribe';
import Head from 'next/head';
import Seo from '../seo';
import {isEmpty} from 'lodash';
import {sanitize} from '../../utils/miscellaneous';
import Modal from 'react-modal';
import useLocalStorageState from '../../utils/useLocalStorageState';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Image from 'next/image';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Layout = ( {data, isPost, children} ) => {
	const [searchModalIsOpen, setSearchModalIsOpen] = useState(false);
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
			document.documentElement.style.fontSize = `${100 + (accessibilitySettings.textSize * 50)}%`;
		} else {
			document.documentElement.style.fontSize = '100%';
		}
	}, [accessibilitySettings.textSize]);

	const {page, post, posts, header, footer } = data || {};

	// If it does not have either post or page.
	if ( isEmpty( page ) && isEmpty( post ) && isEmpty( posts ) ) {
		//return null;
	}

	const seo = isPost ? ( post?.seo ?? {} ) : ( page?.seo ?? {} );
	const uri = isPost ? ( post?.uri ?? {} ) : ( page?.uri ?? {} );
	//console.log(accessibilitySettings)

	const openSearchModal = () => setSearchModalIsOpen(true);
  const afterOpenSearchModal = () => {
    
  };

  const closeSearchModal = () => setSearchModalIsOpen(false);
	const router = useRouter();
	//console.log(router.pathname);

	return (
		<div className={
			'app' +
			(accessibilitySettings.colorContrast ? ' accessibility-color-contrast' : '') + 
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
			<Header header={header} openSearchModal={openSearchModal} />
			<div className="md:container pb-24 mx-auto min-h-almost-screen">
				{children}
			</div>
			<Accessibility 
			  accessibilitySettings={accessibilitySettings}
			  setAccessibilitySettings={setAccessibilitySettings}
			/>
			<Subscribe />
			{(router.pathname === '/committees') ?
      <div className="committee-cta">
        <div className="committee-become">
          <div class="com-cta-bg">
						<Image
							src="/images/committees/become-a-member.jpg"
							width="953"
							height="286"
						/>
					</div>
          <div class="com-cta-button">
						<a href="#">Become a Member
							<Image
								src="/images/right-arrow.png"
								width={51}
								height={26}
								alt="Right Arrow"
							/>
						</a>
					</div>
        </div>
        <div className="committee-join">
          <div class="com-cta-bg">
						<Image
							src="/images/committees/join-a-committee.jpg"
							width="953"
							height="286"
						/>
					</div>
          <div class="com-cta-button">
						<a href="#">Already a Member? Join a Committee
							<Image
								src="/images/right-arrow.png"
								width={51}
								height={26}
								alt="Right Arrow"
							/>
						</a>
					</div>
        </div>
      </div> : ""
			}
			<Footer siteLogoUrl={header?.siteLogoUrl} footer={footer}/>
			<Modal
        isOpen={searchModalIsOpen}
        onAfterOpen={afterOpenSearchModal}
        onRequestClose={closeSearchModal}
        style={customStyles}
        contentLabel="Search Modal"
      >
				<h1>Search Modal</h1>
			</Modal>
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


