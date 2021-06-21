import { forwardRef, memo } from 'react';
import Button from '../../Button/Button';
import Link from 'next/link';

const ResourcesMegaMenu = forwardRef(
  ({ resourcesMegaMenu }, ref) => (
    <div
      ref={ref}
      id="resources-mega-menu"
      className="mega-menu absolute z-50 left-0 top-full hidden flex-wrap overflow-hidden pt-6 pb-36 -mt-2 md:-mx-2 lg:-mx-6 border-solid border-t-4 border-brand-blue bg-white bg-clip-padding"
      style={{
        borderLeft: '1.25rem solid rgba(255, 255, 255, 0.5)',
        borderRight: '1.25rem solid rgba(255, 255, 255, 0.5)',
        borderBottom: '1.25rem solid rgba(255, 255, 255, 0.5)',
      }}
      /*onMouseEnter={() => {
        setResourcesMegaMenuIsActive(true);
        const megaMenuClassList = ref.current?.classList;
        megaMenuClassList?.remove('hidden');
        megaMenuClassList?.add('flex');
      }}
      onMouseLeave={() => {
        setResourcesMegaMenuIsActive(false);
        const megaMenuClassList = ref.current?.classList;
        megaMenuClassList?.remove('flex');
        megaMenuClassList?.add('hidden');
      }}*/
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
          {resourcesMegaMenu?.block2Topics1?.length > 0 && (
            <ul>
              {resourcesMegaMenu?.block2Topics1?.map((topic) => (
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
          {resourcesMegaMenu?.block4Types?.length > 0 && (
            <ul>
              {resourcesMegaMenu?.block4Types?.map((type) => (
                <li className="mb-2">
                  <Link href={`/types/${type.type?.slug ?? ''}/resources/`}>
                    <a>{type.type?.name ?? ''}</a>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="w-full overflow-hidden md:my-2 md:px-2 md:w-1/3 lg:my-6 lg:px-6 border-solid">
        <div className="h-full pt-6 px-6 pb-12 border-solid border-b-4 border-brand-orange bg-brand-gray">
          <h4 className="mb-2 nova uppercase text-brand-orange">
            {resourcesMegaMenu?.block5Heading ?? ''}
          </h4>
          {resourcesMegaMenu?.block5Committees?.length > 0 && (
            <ul>
              {resourcesMegaMenu?.block5Committees?.map((committee) => (
                <li className="mb-2">
                  <Link
                    href={`/committees/${
                      committee.committee?.slug ?? ''
                    }/resources/`}
                  >
                    <a>{committee.committee?.name ?? ''}</a>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="w-full overflow-hidden md:my-2 md:px-2 md:w-1/3 lg:my-6 lg:px-6">
        <div className="h-full pt-6 px-6 pb-12 border-solid border-b-4 border-brand-navy bg-brand-gray">
          <h4 className="mb-2 nova uppercase text-brand-navy">
            {resourcesMegaMenu?.block6Heading ?? ''}
          </h4>
          {resourcesMegaMenu?.block6VideosWebinars?.length > 0 && (
            <ul>
              {resourcesMegaMenu?.block6VideosWebinars?.map((video) => (
                <li className="mb-2">
                  <Link href={`/videos/?videoId=${video.video?.id ?? ''}`}>
                    <a>{video.video?.title ?? ''}</a>
                  </Link>
                </li>
              ))}
              <li className="mb-2">
                <Link href={resourcesMegaMenu?.block6MoreLinkUrl ?? ''}>
                  <a target="_blank">
                    {resourcesMegaMenu?.block6MoreLinkText ?? ''}
                  </a>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  )
);

export default memo(ResourcesMegaMenu);
