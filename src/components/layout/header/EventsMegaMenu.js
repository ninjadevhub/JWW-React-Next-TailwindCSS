import { forwardRef, memo } from 'react';
import Button from '../../Button/Button';

const EventsMegaMenu = forwardRef(
  ({ eventsMegaMenu }, ref) => (
    <div
      ref={ref}
      id="events-mega-menu"
      className="mega-menu latest-news-mega-menu absolute z-50 left-0 top-full hidden flex-wrap overflow-hidden px-6 pt-6 pb-36 -mt-2 md:-mx-2 lg:px-18 lg:-mx-6 border-solid border-t-4 border-brand-blue bg-white bg-clip-padding"
      style={{
        borderLeft: '1.25rem solid rgba(255, 255, 255, 0.5)',
        borderRight: '1.25rem solid rgba(255, 255, 255, 0.5)',
        borderBottom: '1.25rem solid rgba(255, 255, 255, 0.5)',
      }}
      /*onMouseEnter={() => {
        seteventsMegaMenuIsActive(true);
        const megaMenuClassList = ref.current?.classList;
        megaMenuClassList?.remove('hidden');
        megaMenuClassList?.add('flex');
      }}
      onMouseLeave={() => {
        seteventsMegaMenuIsActive(false);
        const megaMenuClassList = ref.current?.classList;
        megaMenuClassList?.remove('flex');
        megaMenuClassList?.add('hidden');
      }}*/
    >
      <div className="w-full flex flex-col justify-center items-center overflow-hidden md:my-2 md:px-2 md:w-1/3 lg:my-6 lg:px-6">
        <div
          className="w-full h-full flex flex-col justify-end pt-6 px-6 pb-12 border-solid border-b-4 border-black bg-brand-gray bg-no-repeat bg-right-top bg-cover"
          style={{
            maxWidth: 626,
            height: 374,
            backgroundImage: `url('${eventsMegaMenu?.emmBlock1Image?.sourceUrl}')`,
          }}
        >
          <Button
            uri={eventsMegaMenu?.emmBlock1ButtonUrl ?? ''}
            color={eventsMegaMenu?.emmBlock1ButtonColor ?? ''}
            fullWidth={true}
          >
            {eventsMegaMenu?.emmBlock1ButtonText ?? ''}
          </Button>
        </div>
      </div>
      <div className="w-full overflow-hidden md:my-2 md:px-2 md:w-1/3 lg:my-6 lg:px-6">
        <div
          className="h-full flex flex-col justify-end pt-6 px-6 pb-12 border-solid border-b-4 border-brand-blue bg-brand-gray bg-no-repeat bg-left-top bg-cover"
          style={{
            maxWidth: 620,
            height: 374,
            backgroundImage: `url('${eventsMegaMenu?.emmBlock2Image?.sourceUrl}')`,
          }}
        >
          <Button
            uri={eventsMegaMenu?.emmBlock2ButtonUrl ?? ''}
            color={eventsMegaMenu?.emmBlock2ButtonColor ?? ''}
            fullWidth={true}
          >
            {eventsMegaMenu?.emmBlock2ButtonText ?? ''}
          </Button>
        </div>
      </div>
      <div className="w-full overflow-hidden md:my-2 md:px-2 md:w-1/3 lg:my-6 lg:px-6">
        <div
          className="h-full flex flex-col justify-end pt-6 px-6 pb-12 border-solid border-b-4 border-brand-green bg-brand-gray bg-no-repeat bg-left-top bg-cover"
          style={{
            maxWidth: 620,
            height: 374,
            backgroundImage: `url('${eventsMegaMenu?.emmBlock3Image?.sourceUrl}')`,
          }}
        >
          <Button
            uri={eventsMegaMenu?.emmBlock3ButtonUrl ?? ''}
            color={eventsMegaMenu?.emmBlock3ButtonColor ?? ''}
            fullWidth={true}
          >
            {eventsMegaMenu?.emmBlock3ButtonText ?? ''}
          </Button>
        </div>
      </div>
    </div>
  )
);

export default memo(EventsMegaMenu);
