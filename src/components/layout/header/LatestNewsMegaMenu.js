import { forwardRef, memo } from 'react';
import Button from '../../Button/Button';
import Link from 'next/link';

const LatestNewsMegaMenu = forwardRef(
  ({ setLatestNewsMegaMenuIsActive, latestNewsMegaMenu }, ref) => (
    <div
      ref={ref}
      className="latest-news-mega-menu absolute z-50 left-0 top-full hidden flex-wrap overflow-hidden px-6 pt-6 pb-36 -mt-2 md:-mx-2 lg:px-18 lg:-mx-6 border-solid border-t-4 border-brand-blue bg-white"
      onMouseEnter={() => {
        setLatestNewsMegaMenuIsActive(true);
        const megaMenuClassList = ref.current?.classList;
        megaMenuClassList?.remove('hidden');
        megaMenuClassList?.add('flex');
      }}
      onMouseLeave={() => {
        setLatestNewsMegaMenuIsActive(false);
        const megaMenuClassList = ref.current?.classList;
        megaMenuClassList?.remove('flex');
        megaMenuClassList?.add('hidden');
      }}
    >
      <div className="w-full flex flex-col justify-center items-center overflow-hidden md:my-2 md:px-2 md:w-1/2 lg:my-6 lg:px-6">
        <div className="w-full h-full pt-6 px-6 pb-12 border-solid border-b-4 border-black bg-brand-gray">
          <Button
            className="mb-3"
            uri={latestNewsMegaMenu?.block1Button1Url ?? ''}
            color={latestNewsMegaMenu?.block1Button1Color ?? ''}
            fullWidth={true}
          >
            {latestNewsMegaMenu?.block1Button1Text ?? ''}
          </Button>
          <Button
            uri={latestNewsMegaMenu?.block1Button2Url ?? ''}
            color={latestNewsMegaMenu?.block1Button2Color ?? ''}
            fullWidth={true}
          >
            {latestNewsMegaMenu?.block1Button2Text ?? ''}
          </Button>
        </div>
      </div>
      <div className="w-full overflow-hidden md:my-2 md:px-2 md:w-1/2 lg:my-6 lg:px-6">
        <div className="h-full pt-6 px-6 pb-12 border-solid border-b-4 border-brand-blue bg-brand-gray">
          <h4 className="mb-2 nova uppercase text-brand-blue">
            {latestNewsMegaMenu?.block2Heading ?? ''}
          </h4>
          {latestNewsMegaMenu?.block2Topics2?.length > 0 && (
            <ul>
              {latestNewsMegaMenu?.block2Topics2?.map((topic) => (
                <li className="mb-2">
                  <Link href={`/topics/${topic.topic?.slug ?? ''}/resources/`}>
                    <a>{topic.topic?.name ?? ''}</a>
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

export default memo(LatestNewsMegaMenu);
