import { useWordPressContext } from '../../common/WordPressProvider';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from './navigation';
import styles from '../../../styles/components/layout/header/index.module.scss';

const Header = ({ header }) => {
  const { menus } = useWordPressContext();
  const headerMenu = menus?.nodes?.filter((node) =>
    node.locations?.includes('HCMS_MENU_HEADER')
  )?.[0]?.menuItems?.nodes;
  return (
    <header className={styles.header}>
      <div className=" bg-brand-blue text-white">
        <div className="md:container mx-auto py-2 flex justify-center items-center">
          <span className="mr-8">
            April 26: Water Exchange Speaker Series: Preparing for Climate Change
            in the Wake of Houston&rsquo;s Water Crisis
          </span>
          <Link href="">
            <a className="text-white text-semibold">Join Us</a>
          </Link>
        </div>
      </div>
      <div className="md:container mx-auto flex">
        <div className="py-4 mr-16">
          <Link href="/">
            <a>
              {header?.siteLogoUrl ? 
              <Image
                src={header.siteLogoUrl}
                width="200"
                height="79"
              /> :
              'Jersey Water Works'}
            </a>
          </Link>
        </div>
        <div className="flex flex-col justify-between flex-1 pb-3">
          <div className="flex justify-end">
            <div className="flex px-6 py-1 text-lg-2">
              <Link href="#">
                <a className="mr-3 text-brand-blue">About Jersey Water Works</a>
              </Link>
              <Link href="#">
                <a className="ml-3 text-brand-green">Get Involved</a>
              </Link>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <Navigation
              menu={headerMenu}
              styles={styles}
              className={styles.primaryMenu}
            />
            <div className="flex border-solid border-gray-500 border-b-2">
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
      </div>
    </header>
  );
};

export default Header;
