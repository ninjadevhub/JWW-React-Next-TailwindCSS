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
import AboutUsMegaMenu from './AboutUsMegaMenu';
import Button from '../../Button/Button';
import styles from '../../../styles/components/layout/header/index.module.scss';

const Header = ({ header }) => {
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
  
  const linkClickHandler = (event, megaMenuRef) => {
    event.preventDefault();
    document.querySelectorAll('.nav-item, .nav-button').forEach(link => {
      if (link !== event.currentTarget) {
        link.classList.remove('active');
      } else if (!event.currentTarget.classList?.contains('active')) {
        event.currentTarget.classList?.add('active');
      } else {
        event.currentTarget.classList?.remove('active');
      }
    });

    document.querySelectorAll('.mega-menu').forEach(menu => {
      if (menu.id !== megaMenuRef?.current?.id) {
        menu.classList.add('hidden');
        menu.classList.remove('flex');
      } else if (event.currentTarget.classList?.contains('active')) {
        megaMenuRef?.current?.classList?.add('flex');
        megaMenuRef?.current?.classList?.remove('hidden');
        setActiveMegaMenuRef(megaMenuRef);
      } else {
        megaMenuRef?.current?.classList?.add('hidden');
        megaMenuRef?.current?.classList?.remove('flex');
        setActiveMegaMenuRef(null);
      }
    });
  };

  return (
    <header className={styles.header} onClick={event => {
      const link = event.target.closest('.nav-item, .nav-button');
      const megaMenu = event.target.closest('.mega-menu');
      const activeLink = event.currentTarget.querySelector('.nav-item.active, .nav-button.active');
      if (!link && !megaMenu && activeLink) {
        activeMegaMenuRef?.current?.classList?.add('hidden');
        activeMegaMenuRef?.current?.classList?.remove('flex');
        activeLink?.classList?.remove('active');
        setActiveMegaMenuRef(null);
      }
    }}>
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
        <div className="relative flex justify-between items-center flex-1">
          <div className="w-full flex justify-between items-center">
            <Navigation
              menu={headerMenu}
              committeesMegaMenuRef={committeesMegaMenuRef}
              resourcesMegaMenuRef={resourcesMegaMenuRef}
              latestNewsMegaMenuRef={latestNewsMegaMenuRef}
              workPlansMegaMenuRef={workPlansMegaMenuRef}
              eventsMegaMenuRef={eventsMegaMenuRef}
              setActiveMegaMenuRef={setActiveMegaMenuRef}
              styles={styles}
              className={styles.primaryMenu}
            />
            <div className="flex justify-end">
              <div className="flex items-center pl-6 py-1">
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
                <Button 
                  className="nav-button mr-5"
                  onClick={event => linkClickHandler(event, aboutUsMegaMenuRef)}
                  ghost={true}
                >
                  About Us
                </Button>
                <Button
                  className="nav-button"
                  onClick={event => linkClickHandler(event, getInvolvedDropdownMenuRef)}
                  color="brand-green"
                >
                  Get Involved
                </Button>
              </div>
            </div>
          </div>
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

        {committeesMegaMenu && (
          <CommitteesMegaMenu
            ref={committeesMegaMenuRef}
            committeesMegaMenu={committeesMegaMenu}
          />
        )}

        {latestNewsMegaMenu && (
          <LatestNewsMegaMenu
            ref={latestNewsMegaMenuRef}
            latestNewsMegaMenu={latestNewsMegaMenu}
          />
        )}

        {resourcesMegaMenu && (
          <ResourcesMegaMenu
            ref={resourcesMegaMenuRef}
            resourcesMegaMenu={resourcesMegaMenu}
          />
        )}
        {workPlansMegaMenu && (
          <WorkPlansMegaMenu
            ref={workPlansMegaMenuRef}
            workPlansMegaMenu={workPlansMegaMenu}
          />
        )}
        {eventsMegaMenu && (
          <EventsMegaMenu
            ref={eventsMegaMenuRef}
            eventsMegaMenu={eventsMegaMenu}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
