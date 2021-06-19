import Link from 'next/link';
import Image from 'next/image';
import { getIconComponentByName } from '../../../utils/icons-map';
import { isEmpty, isArray } from 'lodash';

const Footer = ({ siteLogoUrl, footer }) => {
  return (
    <footer className="relative">
      <div className="relative bg-brand-navy">
        <div className="md:container px-5 mx-auto">
          <div className="flex -mx-5 text-white">
            <div className="w-1/4 px-5 py-2 text-center">
              <div className="my-3">
                Committee Members
                <div className="text-xl">145</div>
              </div>
            </div>
            <div className="w-1/4 px-5 py-2 text-center">
              <div className="my-3 border-solid border-brand-green border-l">
                Supporting Members
                <div className="text-xl">611</div>
              </div>
            </div>
            <div className="w-1/4 px-5 py-2 text-center">
              <div className="my-3 border-solid border-brand-green border-l">
                People We Reach
                <div className="text-xl">3,513</div>
              </div>
            </div>
            <div className="w-1/4 px-5 py-2 text-center">
              <div className="my-3 border-solid border-brand-green border-l">
                Join the Movement
                <div>
                  <Link href="#">
                    <a className="text-xl">Become a Member</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative md:container px-5 mx-auto">
        <div className="flex -mx-5">
          <div className="w-1/2 px-5">
            <div className="mt-8 mb-4 w-84 max-w-full mx-auto">
              {siteLogoUrl && (
                <Link href="/">
                  <a>
                    <Image src={siteLogoUrl} width="200" height="79" />
                  </a>
                </Link>
              )}
            </div>
            <div className="mb-4 w-84 max-w-full mx-auto">
              <a
                className="no-underline text-gray-500"
                href="tel:1-609-393-0008"
              >
                609-393-0008 ex. 112
              </a>
            </div>
            <div className="mb-4 w-84 max-w-full mx-auto">
              <a
                className="no-underline text-gray-500"
                href="mailto:info@jerseywaterworks.org"
              >
                info@jerseywaterworks.org
              </a>
            </div>
            <div className="mb-10 w-84 max-w-full mx-auto">
              16 W. Lafayette Street
              <br />
              Trenton, NJ 08608
            </div>
            <div className="mb-12 w-84 max-w-full mx-auto">
              <Link href="#">
                <a className="inline-block px-12 py-4 bg-gray-100 text-sm">
                  CONTACT US
                </a>
              </Link>
            </div>
            {!isEmpty(footer?.socialLinks) && isArray(footer?.socialLinks) ? (
              <ul className="flex items-center mb-12 w-84 max-w-full mx-auto">
                {footer.socialLinks.map((socialLink) => (
                  <li 
                    key={socialLink?.iconName}
                    className="mr-6 flex justify-center items-center w-10 h-10"
                  >
                    {getIconComponentByName(socialLink?.iconName, { uri: socialLink?.iconUrl })}
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mb-6 w-84 max-w-full mx-auto">
              {footer?.copyrightText
                ? footer.copyrightText
                : `©${new Date().getFullYear()} Jersey Water Works. All Rights Reserved.`}
            </div>
          </div>
          <div className="w-1/2 bg-brand-green box-shadow-r-long-brand-green text-white">
            <div className="px-5 border-solid border-gray-500 border-b bg-brand-blue box-shadow-r-long-brand-blue">
              <div className="w-84 max-w-full pt-8 pb-14 mx-auto">
                <div className="mb-8 text-xl font-museo">
                  New Jersey&rsquo;s water infrastructure needs an estimated $25
                  billion in upgrades over the next 20 years. What can we do
                  about it?
                </div>
                <Link href="#">
                  <a className="inline-block px-3 py-4 border-solid border-white border-2 text-sm">
                    FIND OUT HOW YOU CAN MAKE A DIFFERENCE
                  </a>
                </Link>
              </div>
            </div>
            <div className="px-5 bg-brand-orange box-shadow-r-long-brand-orange">
              <div className="w-84 max-w-full py-6 mx-auto">
                <div className="flex">
                  <Link href="#">
                    <a className="inline-block mr-2">
                      About Jersey Water Works
                    </a>
                  </Link>
                  <Link href="#">
                    <a className="inline-block ml-2">Equity Statement</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="px-5 pb-12 bg-brand-green box-shadow-r-long-brand-green">
              <div className="w-84 max-w-full py-9 mx-auto">
                <div className="mb-8 text-xl font-museo">
                  Stay Informed
                </div>
                <Link href="#">
                  <a className="inline-block px-3 py-4 border-solid border-white border-2 text-sm">
                    SUBSCRIBE TO OUR NEWSLETTER
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
