import { useState, useRef } from 'react';
import { useWordPressContext } from '../../common/WordPressProvider';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from './navigation';
import Button from '../../Button/Button';
import styles from '../../../styles/components/layout/header/index.module.scss';

const Header = ({ header }) => {
  const [committeesMegaMenuIsActive, setCommitteesMegaMenuIsActive] = useState(false);
  const [resourcesMegaMenuIsActive, setResourcesMegaMenuIsActive] = useState(false);
  const { menus, sitewideSettings } = useWordPressContext();
  const committeesMegaMenuRef = useRef(null);
  const resourcesMegaMenuRef = useRef(null);
  const headerMenu = menus?.nodes?.filter((node) =>
    node.locations?.includes('HCMS_MENU_HEADER')
  )?.[0]?.menuItems?.nodes;
  const { committeesMegaMenu, resourcesMegaMenu } = sitewideSettings || {};

  return (
    <header className={styles.header}>
      <div className=" bg-brand-blue text-white">
        <div className="md:container mx-auto py-2 flex justify-center items-center">
          <span className="mr-8">
            April 26: Water Exchange Speaker Series: Preparing for Climate
            Change in the Wake of Houston&rsquo;s Water Crisis
          </span>
          <Link href="">
            <a className="text-white text-semibold">Join Us</a>
          </Link>
        </div>
      </div>
      <div className="relative md:container mx-auto flex">
        <div className="py-4 mr-16">
          <Link href="/">
            <a>
              {header?.siteLogoUrl ? (
                <Image src={header.siteLogoUrl} width="200" height="79" />
              ) : (
                'Jersey Water Works'
              )}
            </a>
          </Link>
        </div>
        <div className="flex flex-col justify-between flex-1">
          <div className="flex justify-end">
            <div className="flex px-6 py-1 text-lg-2">
              <Link href="/about/">
                <a className="mr-3 text-brand-blue">About Jersey Water Works</a>
              </Link>
              <Link href="/get-involved/">
                <a className="ml-3 text-brand-green">Get Involved</a>
              </Link>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <Navigation
              menu={headerMenu}
              committeesMegaMenuRef={committeesMegaMenuRef}
              committeesMegaMenuIsActive={committeesMegaMenuIsActive}
              resourcesMegaMenuRef={resourcesMegaMenuRef}
              resourcesMegaMenuIsActive={resourcesMegaMenuIsActive}
              styles={styles}
              className={styles.primaryMenu}
            />
            <div className="flex border-solid border-gray-500 border-b-2 mb-6">
              <input
                className="border-none bg-transparent w-32"
                placeholder="Search"
              />
              <button
                type="button"
                title="Submit your search query."
                className=""
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
            </div>
          </div>
        </div>

        {committeesMegaMenu && (
          <div
            ref={committeesMegaMenuRef}
            className="absolute z-50 left-0 top-full hidden flex-wrap overflow-hidden pt-6 pb-36 -mt-2 md:-mx-2 lg:-mx-6 border-solid border-t-4 border-brand-blue bg-white"
            onMouseEnter={() => {
              setCommitteesMegaMenuIsActive(true);
              const megaMenuClassList =
                committeesMegaMenuRef.current?.classList;
              megaMenuClassList?.remove('hidden');
              megaMenuClassList?.add('flex');
            }}
            onMouseLeave={() => {
              setCommitteesMegaMenuIsActive(false);
              const megaMenuClassList =
                committeesMegaMenuRef.current?.classList;
              megaMenuClassList?.remove('flex');
              megaMenuClassList?.add('hidden');
            }}
          >
            <div className="w-full flex flex-col justify-center items-center overflow-hidden md:my-2 md:px-2 md:w-1/3 lg:my-6 lg:px-6">
              <div className="h-full pt-6 px-6 pb-12 border-solid border-b-4 border-black bg-brand-gray">
                <Button
                  className="mb-3"
                  uri={committeesMegaMenu?.button1Url ?? ''}
                  color={committeesMegaMenu?.button1Color ?? ''}
                  fullWidth={true}
                >
                  {committeesMegaMenu?.button1Text ?? ''}
                </Button>
                <Button
                  uri={committeesMegaMenu?.button2Url ?? ''}
                  color={committeesMegaMenu?.button2Color ?? ''}
                  fullWidth={true}
                >
                  {committeesMegaMenu?.button2Text ?? ''}
                </Button>
              </div>
            </div>
            <div className="w-full overflow-hidden md:my-2 md:px-2 md:w-1/3 lg:my-6 lg:px-6">
              <div className="h-full pt-6 px-6 pb-12 border-solid border-b-4 border-brand-blue bg-brand-gray">
                <h4 className="mb-2 nova uppercase text-brand-blue">
                  {committeesMegaMenu?.block2Committee?.name ?? ''}
                </h4>
                <ul>
                  <li className="mb-2">
                    <Link
                      href={`/committees/${committeesMegaMenu?.block2Committee?.slug}/`}
                    >
                      <a>Overview</a>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      href={`/committees/${committeesMegaMenu?.block2Committee?.slug}/work-plans/`}
                    >
                      <a>Workplan Items</a>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      href={`/committees/${committeesMegaMenu?.block2Committee?.slug}/accomplishments/`}
                    >
                      <a>Accomplishments</a>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      href={`/committees/${committeesMegaMenu?.block2Committee?.slug}/resources/`}
                    >
                      <a>Resources</a>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      href={`/committees/${committeesMegaMenu?.block2Committee?.slug}/co-chairs/`}
                    >
                      <a>Co-Chairs</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full overflow-hidden md:my-2 md:px-2 md:w-1/3 lg:my-6 lg:px-6 border-solid">
              <div className="h-full pt-6 px-6 pb-12 border-solid border-b-4 border-brand-green bg-brand-gray">
                <h4 className="mb-2 nova uppercase text-brand-green">
                  {committeesMegaMenu?.block3Committee?.name ?? ''}
                </h4>
                <ul>
                  <li className="mb-2">
                    <Link
                      href={`/committees/${committeesMegaMenu?.block3Committee?.slug}/`}
                    >
                      <a>Overview</a>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      href={`/committees/${committeesMegaMenu?.block3Committee?.slug}/work-plans/`}
                    >
                      <a>Workplan Items</a>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      href={`/committees/${committeesMegaMenu?.block3Committee?.slug}/accomplishments/`}
                    >
                      <a>Accomplishments</a>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      href={`/committees/${committeesMegaMenu?.block3Committee?.slug}/resources/`}
                    >
                      <a>Resources</a>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      href={`/committees/${committeesMegaMenu?.block3Committee?.slug}/co-chairs/`}
                    >
                      <a>Co-Chairs</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full overflow-hidden md:my-2 md:px-2 md:w-1/3 lg:my-6 lg:px-6 border-solid">
              <div className="h-full pt-6 px-6 pb-12 border-solid border-b-4 border-brand-purple bg-brand-gray">
                <h4 className="mb-2 nova uppercase text-brand-purple">
                  {committeesMegaMenu?.block4Committee?.name ?? ''}
                </h4>
                <ul>
                  <li className="mb-2">
                    <Link
                      href={`/committees/${committeesMegaMenu?.block4Committee?.slug}/`}
                    >
                      <a>Overview</a>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      href={`/committees/${committeesMegaMenu?.block4Committee?.slug}/work-plans/`}
                    >
                      <a>Workplan Items</a>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      href={`/committees/${committeesMegaMenu?.block4Committee?.slug}/accomplishments/`}
                    >
                      <a>Accomplishments</a>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      href={`/committees/${committeesMegaMenu?.block4Committee?.slug}/resources/`}
                    >
                      <a>Resources</a>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      href={`/committees/${committeesMegaMenu?.block4Committee?.slug}/co-chairs/`}
                    >
                      <a>Co-Chairs</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full overflow-hidden md:my-2 md:px-2 md:w-1/3 lg:my-6 lg:px-6 border-solid">
              <div className="h-full pt-6 px-6 pb-12 border-solid border-b-4 border-brand-orange bg-brand-gray">
                <h4 className="mb-2 nova uppercase text-brand-orange">
                  {committeesMegaMenu?.block5Committee?.name ?? ''}
                </h4>
                <ul>
                  <li className="mb-2">
                    <Link
                      href={`/committees/${committeesMegaMenu?.block5Committee?.slug}/`}
                    >
                      <a>Overview</a>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      href={`/committees/${committeesMegaMenu?.block5Committee?.slug}/work-plans/`}
                    >
                      <a>Workplan Items</a>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      href={`/committees/${committeesMegaMenu?.block5Committee?.slug}/accomplishments/`}
                    >
                      <a>Accomplishments</a>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      href={`/committees/${committeesMegaMenu?.block5Committee?.slug}/resources/`}
                    >
                      <a>Resources</a>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      href={`/committees/${committeesMegaMenu?.block5Committee?.slug}/co-chairs/`}
                    >
                      <a>Co-Chairs</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full overflow-hidden md:my-2 md:px-2 md:w-1/3 lg:my-6 lg:px-6">
              <div className="h-full pt-6 px-6 pb-12 border-solid border-b-4 border-brand-navy bg-brand-gray">
                <h4 className="mb-2 nova uppercase text-brand-navy">
                  {committeesMegaMenu?.block6Committee?.name ?? ''}
                </h4>
                <ul>
                  <li className="mb-2">
                    <Link
                      href={`/committees/${committeesMegaMenu?.block6Committee?.slug}/`}
                    >
                      <a>Overview</a>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      href={`/committees/${committeesMegaMenu?.block6Committee?.slug}/work-plans/`}
                    >
                      <a>Workplan Items</a>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      href={`/committees/${committeesMegaMenu?.block6Committee?.slug}/accomplishments/`}
                    >
                      <a>Accomplishments</a>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      href={`/committees/${committeesMegaMenu?.block6Committee?.slug}/resources/`}
                    >
                      <a>Resources</a>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      href={`/committees/${committeesMegaMenu?.block6Committee?.slug}/co-chairs/`}
                    >
                      <a>Co-Chairs</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {resourcesMegaMenu && (
          <div
            ref={resourcesMegaMenuRef}
            className="absolute z-50 left-0 top-full hidden flex-wrap overflow-hidden pt-6 pb-36 -mt-2 md:-mx-2 lg:-mx-6 border-solid border-t-4 border-brand-blue bg-white"
            onMouseEnter={() => {
              setResourcesMegaMenuIsActive(true);
              const megaMenuClassList =
                resourcesMegaMenuRef.current?.classList;
              megaMenuClassList?.remove('hidden');
              megaMenuClassList?.add('flex');
            }}
            onMouseLeave={() => {
              setResourcesMegaMenuIsActive(false);
              const megaMenuClassList =
                resourcesMegaMenuRef.current?.classList;
              megaMenuClassList?.remove('flex');
              megaMenuClassList?.add('hidden');
            }}
          >
            <div className="w-full flex flex-col justify-center items-center overflow-hidden md:my-2 md:px-2 md:w-1/3 lg:my-6 lg:px-6">
              <div className="h-full pt-6 px-6 pb-12 border-solid border-b-4 border-black bg-brand-gray">
                <Button
                  className="mb-3"
                  uri={resourcesMegaMenu?.button1Url ?? ''}
                  color={resourcesMegaMenu?.button1Color ?? ''}
                  fullWidth={true}
                >
                  {resourcesMegaMenu?.button1Text ?? ''}
                </Button>
                <Button
                  uri={resourcesMegaMenu?.button2Url ?? ''}
                  color={resourcesMegaMenu?.button2Color ?? ''}
                  fullWidth={true}
                >
                  {resourcesMegaMenu?.button2Text ?? ''}
                </Button>
              </div>
            </div>
            <div className="w-full overflow-hidden md:my-2 md:px-2 md:w-1/3 lg:my-6 lg:px-6">
              <div className="h-full pt-6 px-6 pb-12 border-solid border-b-4 border-brand-blue bg-brand-gray">
                <h4 className="mb-2 nova uppercase text-brand-blue">
                  {resourcesMegaMenu?.block2Heading ?? ''}
                </h4>
				  {resourcesMegaMenu?.block2Topics?.length > 0 &&
                <ul>
					  {resourcesMegaMenu?.block2Topics?.map(topic => (
                  <li className="mb-2">
                    <Link
                      href={`/topics/${topic.topic?.slug ?? ''}/resources/`}
                    >
                      <a>{topic.topic?.name ?? ''}</a>
                    </Link>
                  </li>
                  ))}
                </ul>}
              </div>
            </div>
            <div className="w-full overflow-hidden md:my-2 md:px-2 md:w-1/3 lg:my-6 lg:px-6 border-solid">
              <div className="h-full pt-6 px-6 pb-12 border-solid border-b-4 border-brand-green bg-brand-gray">
                <h4 className="mb-2 nova uppercase text-brand-green">
                  {resourcesMegaMenu?.block3Heading ?? ''}
                </h4>
              </div>
            </div>
            <div className="w-full overflow-hidden md:my-2 md:px-2 md:w-1/3 lg:my-6 lg:px-6 border-solid">
              <div className="h-full pt-6 px-6 pb-12 border-solid border-b-4 border-brand-purple bg-brand-gray">
                <h4 className="mb-2 nova uppercase text-brand-purple">
                  {resourcesMegaMenu?.block4Heading ?? ''}
                </h4>
				  {resourcesMegaMenu?.block4Types?.length > 0 &&
					  <ul>
					  {resourcesMegaMenu?.block4Types?.map(type => (
						  <li className="mb-2">
                    <Link
                      href={`/types/${type.type?.slug ?? ''}/resources/`}
                    >
                      <a>{type.type?.name ?? ''}</a>
                    </Link>
                  </li>
					  ))}
                </ul>}
              </div>
            </div>
            <div className="w-full overflow-hidden md:my-2 md:px-2 md:w-1/3 lg:my-6 lg:px-6 border-solid">
              <div className="h-full pt-6 px-6 pb-12 border-solid border-b-4 border-brand-orange bg-brand-gray">
                <h4 className="mb-2 nova uppercase text-brand-orange">
                  {resourcesMegaMenu?.block5Heading ?? ''}
                </h4>
				  {resourcesMegaMenu?.block5Committees?.length > 0 &&
					  <ul>
					  {resourcesMegaMenu?.block5Committees?.map(committee => (
						  <li className="mb-2">
                    <Link
                      href={`/committees/${committee.committee?.slug ?? ''}/resources/`}
                    >
                      <a>{committee.committee?.name ?? ''}</a>
                    </Link>
                  </li>
					  ))}
                </ul>}
              </div>
            </div>
            <div className="w-full overflow-hidden md:my-2 md:px-2 md:w-1/3 lg:my-6 lg:px-6">
              <div className="h-full pt-6 px-6 pb-12 border-solid border-b-4 border-brand-navy bg-brand-gray">
                <h4 className="mb-2 nova uppercase text-brand-navy">
                  {resourcesMegaMenu?.block6Heading ?? ''}
                </h4>
				  {resourcesMegaMenu?.block6VideosWebinars?.length > 0 &&
					  <ul>
					  {resourcesMegaMenu?.block6VideosWebinars?.map(video => (
						  <li className="mb-2">
                    <Link
                      href={`/videos/?videoId=${video.video?.id ?? ''}`}
                    >
                      <a>{video.video?.title ?? ''}</a>
                    </Link>
                  </li>
					  ))}
                  <li className="mb-2">
                    <Link
                      href={resourcesMegaMenu?.block6MoreLinkUrl ?? ''}
                    >
                      <a target="_blank">{resourcesMegaMenu?.block6MoreLinkText ?? ''}</a>
                    </Link>
                  </li>
                </ul>}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
