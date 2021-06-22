import { forwardRef, memo } from 'react';
import Button from '../../Button/Button';

const WorkPlansMegaMenu = forwardRef(
  ({ workPlansMegaMenu }, ref) => (
    <div
      ref={ref}
      id="work-plans-mega-menu"
      className="mega-menu latest-news-mega-menu absolute z-50 left-0 top-full hidden flex-wrap overflow-hidden px-6 pt-6 pb-36 -mt-2 md:-mx-2 lg:px-18 lg:-mx-6 border-solid border-t-4 border-brand-blue bg-white bg-clip-padding"
      style={{
        borderLeft: '1.25rem solid rgba(255, 255, 255, 0.5)',
        borderRight: '1.25rem solid rgba(255, 255, 255, 0.5)',
        borderBottom: '1.25rem solid rgba(255, 255, 255, 0.5)',
      }}
      /*onMouseEnter={() => {
        setWorkPlansMegaMenuIsActive(true);
        const megaMenuClassList = ref.current?.classList;
        megaMenuClassList?.remove('hidden');
        megaMenuClassList?.add('flex');
      }}
      onMouseLeave={() => {
        setWorkPlansMegaMenuIsActive(false);
        const megaMenuClassList = ref.current?.classList;
        megaMenuClassList?.remove('flex');
        megaMenuClassList?.add('hidden');
      }}*/
    >
      <div className="w-full flex flex-col justify-center items-center overflow-hidden md:my-2 md:px-2 md:w-1/2 lg:my-6 lg:px-6">
        <div
          className="w-full h-full flex flex-col justify-end pt-6 px-6 pb-12 border-solid border-b-4 border-brand-green bg-brand-gray bg-no-repeat bg-right-top bg-cover"
          style={{
            maxWidth: 626,
            height: 374,
            backgroundImage: `url('${workPlansMegaMenu?.block1Image?.sourceUrl}')`,
          }}
        >
          <Button
            uri={workPlansMegaMenu?.block1ButtonUrl ?? ''}
            color={workPlansMegaMenu?.block1ButtonColor ?? ''}
            fullWidth={true}
          >
            {workPlansMegaMenu?.block1ButtonText ?? ''}
          </Button>
        </div>
      </div>
      <div className="w-full overflow-hidden md:my-2 md:px-2 md:w-1/2 lg:my-6 lg:px-6">
        <div
          className="h-full flex flex-col justify-end pt-6 px-6 pb-12 border-solid border-b-4 border-brand-orange bg-brand-gray bg-no-repeat bg-left-top bg-cover"
          style={{
            maxWidth: 620,
            height: 374,
            backgroundImage: `url('${workPlansMegaMenu?.block2Image?.sourceUrl}')`,
          }}
        >
          <Button
            uri={workPlansMegaMenu?.block2ButtonUrl ?? ''}
            color={workPlansMegaMenu?.block2ButtonColor ?? ''}
            fullWidth={true}
          >
            {workPlansMegaMenu?.block2ButtonText ?? ''}
          </Button>
        </div>
      </div>
    </div>
  )
);

export default memo(WorkPlansMegaMenu);
