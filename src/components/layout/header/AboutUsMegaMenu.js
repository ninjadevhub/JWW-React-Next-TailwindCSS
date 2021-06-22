import { forwardRef, memo } from 'react';
import Button from '../../Button/Button';
import Link from 'next/link';

const AboutUsMegaMenu = forwardRef(
  ({ aboutUsMegaMenu }, ref) => (
    <div
      ref={ref}
      id="latest-news-mega-menu"
      className="mega-menu latest-news-mega-menu absolute z-50 right-0 top-full hidden flex-wrap overflow-hidden px-6 pt-6 pb-36 -mt-2 md:-mx-2 lg:px-18 lg:-mx-6 bg-white bg-clip-padding"
      style={{
        borderLeft: '1.25rem solid rgba(255, 255, 255, 0.5)',
        borderRight: '1.25rem solid rgba(255, 255, 255, 0.5)',
        borderBottom: '1.25rem solid rgba(255, 255, 255, 0.5)',
      }}
      /*onMouseEnter={() => {
        setaboutUsMegaMenuIsActive(true);
        const megaMenuClassList = ref.current?.classList;
        megaMenuClassList?.remove('hidden');
        megaMenuClassList?.add('flex');
      }}
      onMouseLeave={() => {
        setaboutUsMegaMenuIsActive(false);
        const megaMenuClassList = ref.current?.classList;
        megaMenuClassList?.remove('flex');
        megaMenuClassList?.add('hidden');
      }}*/
    >
      <div className="w-full flex flex-col justify-center items-center overflow-hidden md:my-2 md:px-2 md:w-1/2 lg:my-6 lg:px-6">
        <div className="w-full h-full pt-6 px-6 pb-12 border-solid border-b-4 border-black bg-brand-gray">
          {aboutUsMegaMenu?.aummBlock1Buttons?.map(button => (
          <Button
            className="mb-3"
            uri={button.buttonUrl ?? ''}
            color={button.buttonColor ?? ''}
            fullWidth={true}
          >
            {button.buttonText ?? ''}
          </Button>
          ))}
        </div>
      </div>
      <div className="w-full overflow-hidden md:my-2 md:px-2 md:w-1/2 lg:my-6 lg:px-6">
        <div className="h-full pt-6 px-6 pb-12 border-solid border-b-4 border-brand-blue bg-brand-gray">
          <h4 className="mb-2 nova uppercase text-brand-blue">
            {aboutUsMegaMenu?.aummBlock2Heading ?? ''}
          </h4>
          {aboutUsMegaMenu?.aummBlock2Links?.length > 0 && (
            <ul>
              {aboutUsMegaMenu?.aummBlock2Links?.map((link) => (
                <li className="mb-2">
                  <Link href={link.linkUrl ?? ''}>
                    <a>{link.linkText ?? ''}</a>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
);

export default memo(AboutUsMegaMenu);
