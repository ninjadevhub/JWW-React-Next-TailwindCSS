import Link from 'next/link';
import Image from 'next/image';
import { getIconComponentByName } from '../../../utils/icons-map';
import { isEmpty, isArray } from 'lodash';

const Footer = ({ siteLogoUrl, footer }) => {
  console.log(JSON.stringify({ siteLogoUrl, footer }));
  return (
    <footer className="relative">
			<div className="absolute w-1/2 h-full right-0 top-0 bg-gray-100"></div>
      <div className="relative bg-gray-500">
        <div className="md:container px-5 mx-auto">
          <div className="flex -mx-5 text-white">
            <div className="w-1/4 px-5 py-2 text-center">
              <div className="my-3">
                Committee Members
                <div className="text-xl">145</div>
              </div>
            </div>
            <div className="w-1/4 px-5 py-2 text-center">
              <div className="my-3 border-solid border-white border-l">
                Supporting Members
                <div className="text-xl">611</div>
              </div>
            </div>
            <div className="w-1/4 px-5 py-2 text-center">
              <div className="my-3 border-solid border-white border-l">
                People We Reach
                <div className="text-xl">3,513</div>
              </div>
            </div>
            <div className="w-1/4 px-5 py-2 text-center">
              <div className="my-3 border-solid border-white border-l">
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
            <div className="mt-8 mb-4">
              {siteLogoUrl && (
                <Link href="/">
                  <a>
                    <Image src={siteLogoUrl} width="200" height="79" />
                  </a>
                </Link>
              )}
            </div>
            <div class="mb-4">
              <a
                className="no-underline text-gray-500"
                href="tel:1-609-393-0008"
              >
                609-393-0008 ex. 112
              </a>
            </div>
            <div class="mb-4">
              <a
                className="no-underline text-gray-500"
                href="mailto:info@jerseywaterworks.org"
              >
                info@jerseywaterworks.org
              </a>
            </div>
            <div className="mb-10">
              16 W. Lafayette Street
              <br />
              Trenton, NJ 08608
            </div>
            <div className="mb-12">
              <Link href="#">
                <a className="inline-block px-12 py-4 bg-gray-100 text-sm">
                  CONTACT US
                </a>
              </Link>
            </div>
            {!isEmpty(footer?.socialLinks) && isArray(footer?.socialLinks) ? (
              <ul className="flex items-center mb-12">
                {footer.socialLinks.map((socialLink) => (
                  <li key={socialLink?.iconName} className="mr-6">
                    <a
                      className="flex justify-center items-center w-10 h-10 rounded-full bg-gray-500"
                      href={socialLink?.iconUrl}
                    >
                      {getIconComponentByName(socialLink?.iconName)}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mb-6">
              {footer?.copyrightText
                ? footer.copyrightText
                : `©${new Date().getFullYear()} Jersey Water Works. All Rights Reserved.`}
            </div>
          </div>
          <div className="w-1/2 bg-gray-100">
            <div className="px-5 border-solid border-gray-500 border-b">
              <div className="w-84 max-w-full py-8 mx-auto">
                <div className="mb-5 text-xl">
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
            <div className="px-5 border-solid border-gray-500 border-b">
              <div className="w-84 max-w-full py-6 mx-auto">
                <div className="flex">
                  <Link href="#">
                    <a className="inline-block mr-2">
                      About Jersey Water Works
                    </a>
                  </Link>
                  |
                  <Link href="#">
                    <a className="inline-block ml-2">Equity Statement</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="px-5">
              <div className="w-84 max-w-full py-8 mx-auto">
                <div className="mb-5 text-xl">
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
