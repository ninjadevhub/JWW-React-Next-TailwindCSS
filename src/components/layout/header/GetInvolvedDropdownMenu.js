import { forwardRef, memo } from 'react';
import Button from '../../Button/Button';

const GetInvolvedDropdownMenu = forwardRef(
  ({ getInvolvedDropdownMenu }, ref) => (
    <div
      ref={ref}
      id="get-involved-dropdown-menu"
      className="mega-menu absolute z-50 left-0 top-full hidden flex-wrap overflow-hidden px-6 pt-6 pb-36 -mt-2 md:-mx-2 lg:px-18 lg:-mx-6 border-solid border-t-4 border-brand-blue bg-white bg-clip-padding"
      style={{
        borderLeft: '1.25rem solid rgba(255, 255, 255, 0.5)',
        borderRight: '1.25rem solid rgba(255, 255, 255, 0.5)',
        borderBottom: '1.25rem solid rgba(255, 255, 255, 0.5)',
      }}
      /*onMouseEnter={() => {
        setgetInvolvedDropdownMenuIsActive(true);
        const megaMenuClassList = ref.current?.classList;
        megaMenuClassList?.remove('hidden');
        megaMenuClassList?.add('flex');
      }}
      onMouseLeave={() => {
        setgetInvolvedDropdownMenuIsActive(false);
        const megaMenuClassList = ref.current?.classList;
        megaMenuClassList?.remove('flex');
        megaMenuClassList?.add('hidden');
      }}*/
    >
      <div className="w-100 max-w-full flex flex-col justify-center items-center overflow-hidden md:my-2 md:px-2d lg:my-6 lg:px-6">
        <div
          className="w-full h-full flex flex-col pt-6 px-6 pb-12 border-solid border-b-4 border-brand-green bg-brand-gray bg-no-repeat bg-right-top bg-cover"
        >
          {getInvolvedDropdownMenu?.gidButtons?.map(button => (
          <Button
            uri={button.buttonUrl ?? ''}
            color={button.buttonColor ?? ''}
            fullWidth={true}
          >
            {button.buttonText ?? ''}
          </Button>
          ))}
        </div>
      </div>
    </div>
  )
);

export default memo(GetInvolvedDropdownMenu);
