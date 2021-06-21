import { useState, useRef } from 'react';
import { useWordPressContext } from '../../common/WordPressProvider';
import Link from 'next/link';
import Image from 'next/image';
import { FaChevronRight } from 'react-icons/fa'
import Navigation from './Navigation';
import CommitteesMegaMenu from './CommitteesMegaMenu';
import ResourcesMegaMenu from './ResourcesMegaMenu';
import LatestNewsMegaMenu from './LatestNewsMegaMenu';
import WorkPlansMegaMenu from './WorkPlansMegaMenu';
import EventsMegaMenu from './EventsMegaMenu';
import GetInvolvedDropdownMenu from './GetInvolvedDropdownMenu';
import Button from '../../Button/Button';
import styles from '../../../styles/components/layout/header/index.module.scss';

const Header = ({ header }) => {
  /*const [committeesMegaMenuIsActive, setCommitteesMegaMenuIsActive] = useState(false);
  const [resourcesMegaMenuIsActive, setResourcesMegaMenuIsActive] = useState(false);
  const [latestNewsMegaMenuIsActive, setLatestNewsMegaMenuIsActive] = useState(false);
  const [workPlansMegaMenuIsActive, setWorkPlansMegaMenuIsActive] = useState(false);*/
  const [activeMegaMenuRef, setActiveMegaMenuRef] = useState(null);
  const { menus, sitewideSettings } = useWordPressContext();
  const committeesMegaMenuRef = useRef(null);
  const resourcesMegaMenuRef = useRef(null);
  const latestNewsMegaMenuRef = useRef(null);
  const workPlansMegaMenuRef = useRef(null);
  const eventsMegaMenuRef = useRef(null);
  const getInvolvedDropdownMenuRef = useRef(null);
  const aboutUsMegaMenuRef = useRef(null);
  const headerMenu = menus?.nodes?.filter((node) =>
    node.locations?.includes('HCMS_MENU_HEADER')
  )?.[0]?.menuItems?.nodes;
  const {
    committeesMegaMenu,
    resourcesMegaMenu,
    latestNewsMegaMenu,
    workPlansMegaMenu,
    eventsMegaMenu,
    getInvolvedDropdownMenu,
    aboutUsMegaMenu,
  } = sitewideSettings || {};

  return (
    <header className={styles.header} onClick={event => {
      const link = event.target.closest('.nav-item');
      const megaMenu = event.target.closest('.mega-menu');
      const activeLink = event.currentTarget.querySelector('.nav-item.active');
      if (!link && !megaMenu && activeLink) {
        activeMegaMenuRef?.current?.classList?.add('hidden');
        activeMegaMenuRef?.current?.classList?.remove('flex');
        activeLink?.classList?.remove('active');
        setActiveMegaMenuRef(null);
      }
    }}>
      {/*<div className=" bg-brand-blue text-white">
        <div className="md:container mx-auto py-2 flex justify-center items-center">
          <div className="mr-8 font-light">
              April 26: Water Exchange Speaker Series: Preparing for Climate Change
              in the Wake of Houston&rsquo;s Water Crisis  
          </div>
          <Link href="#">
            <a className="flex items-center text-white text-semibold text-center">
              <span>Join Us</span>
              <FaChevronRight className='ml-1 mb-0.5 text-xs' />
            </a>
          </Link>
        </div>
      </div>*/}
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
        <div className="flex justify-between items-center flex-1">
          <div className="w-full flex justify-between items-center">
            <Navigation
              menu={headerMenu}
              committeesMegaMenuRef={committeesMegaMenuRef}
              //committeesMegaMenuIsActive={committeesMegaMenuIsActive}
              resourcesMegaMenuRef={resourcesMegaMenuRef}
              //resourcesMegaMenuIsActive={resourcesMegaMenuIsActive}
              latestNewsMegaMenuRef={latestNewsMegaMenuRef}
              //latestNewsMegaMenuIsActive={latestNewsMegaMenuIsActive}
              workPlansMegaMenuRef={workPlansMegaMenuRef}
              //workPlansMegaMenuIsActive={workPlansMegaMenuIsActive}
              eventsMegaMenuRef={eventsMegaMenuRef}
              setActiveMegaMenuRef={setActiveMegaMenuRef}
              styles={styles}
              className={styles.primaryMenu}
            />
            <div className="flex justify-end">
              <div className="flex items-center px-6 py-1">
                <Link href="/search/">
                  <a className="mr-5">
                    <svg
                      className="w-8 h-8"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 40 40"
                    >
                      <path d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z" fill="#fbbf24"></path>
                    </svg>
                  </a>
                </Link>
                <Button className="mr-5" uri="/about/" ghost={true}>
                  About Us
                </Button>
                <Button uri="/get-involved/" color="brand-green">
                  Get Involved
                </Button>
              </div>
            </div>
          </div>
        </div>

        {committeesMegaMenu && (
          <CommitteesMegaMenu
            ref={committeesMegaMenuRef}
            //setCommitteesMegaMenuIsActive={setCommitteesMegaMenuIsActive}
            committeesMegaMenu={committeesMegaMenu}
          />
        )}

        {latestNewsMegaMenu && (
          <LatestNewsMegaMenu
            ref={latestNewsMegaMenuRef}
            //setLatestNewsMegaMenuIsActive={setLatestNewsMegaMenuIsActive}
            latestNewsMegaMenu={latestNewsMegaMenu}
          />
        )}

        {resourcesMegaMenu && (
          <ResourcesMegaMenu
            ref={resourcesMegaMenuRef}
            //setResourcesMegaMenuIsActive={setResourcesMegaMenuIsActive}
            resourcesMegaMenu={resourcesMegaMenu}
          />
        )}
        {workPlansMegaMenu && (
          <WorkPlansMegaMenu
            ref={workPlansMegaMenuRef}
            //setWorkPlansMegaMenuIsActive={setWorkPlansMegaMenuIsActive}
            workPlansMegaMenu={workPlansMegaMenu}
          />
        )}
        {eventsMegaMenu && (
          <EventsMegaMenu
            ref={eventsMegaMenuRef}
            eventsMegaMenu={eventsMegaMenu}
          />
        )}
        {getInvolvedDropdownMenu && (
          <GetInvolvedDropdownMenu
            ref={getInvolvedDropdownMenuRef}
            getInvolvedDropdownMenu={getInvolvedDropdownMenu}
          />
        )}
        {aboutUsMegaMenu && (
          <AboutUsMegaMenu
            ref={aboutUsMegaMenuRef}
            aboutUsMegaMenu={aboutUsMegaMenu}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
