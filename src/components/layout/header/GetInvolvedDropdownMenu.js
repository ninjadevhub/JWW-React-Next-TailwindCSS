import { forwardRef, memo } from 'react';
import Button from '../../Button/Button';

const GetInvolvedDropdownMenu = forwardRef(
  ({ getInvolvedDropdownMenu }, ref) => (
    <div
      ref={ref}
      id="get-involved-dropdown-menu"
      className="mega-menu absolute z-50 right-0 top-full hidden flex-wrap overflow-hidden -mt-8"
    >
      <div className="w-100 max-w-full flex flex-col justify-center items-center overflow-hidden">
        <div
          className="w-full h-full flex flex-col pt-12 px-12 pb-8 border-solid border-b-4 border-brand-green bg-brand-gray bg-no-repeat bg-right-top bg-cover"
        >
          {getInvolvedDropdownMenu?.gidButtons?.map(button => (
          <Button
            className="mb-4"
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
