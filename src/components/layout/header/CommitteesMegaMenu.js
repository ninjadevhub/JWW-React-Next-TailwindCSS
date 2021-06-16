import { forwardRef, memo } from 'react';
import Button from '../../Button/Button';
import Link from 'next/link';

const CommitteesMegaMenu = forwardRef(
  ({ setCommitteesMegaMenuIsActive, committeesMegaMenu }, ref) => (
    <div
      ref={ref}
      className="absolute z-50 left-0 top-full hidden flex-wrap overflow-hidden pt-6 pb-36 -mt-2 md:-mx-2 lg:-mx-6 border-solid border-t-4 border-brand-blue bg-white"
      onMouseEnter={() => {
        setCommitteesMegaMenuIsActive(true);
        const megaMenuClassList = ref.current?.classList;
        megaMenuClassList?.remove('hidden');
        megaMenuClassList?.add('flex');
      }}
      onMouseLeave={() => {
        setCommitteesMegaMenuIsActive(false);
        const megaMenuClassList = ref.current?.classList;
        megaMenuClassList?.remove('flex');
        megaMenuClassList?.add('hidden');
      }}
    >
      <div className="w-full flex flex-col justify-center items-center overflow-hidden md:my-2 md:px-2 md:w-1/3 lg:my-6 lg:px-6">
        <div className="h-full pt-6 px-6 pb-12 border-solid border-b-4 border-black bg-brand-gray">
          <Button
            className="mb-3"
            uri={committeesMegaMenu?.button1Url ?? ''}
            color={committeesMegaMenu?.button1Color ?? ''}
            fullWidth={true}
          >
            {committeesMegaMenu?.button1Text ?? ''}
          </Button>
          <Button
            uri={committeesMegaMenu?.button2Url ?? ''}
            color={committeesMegaMenu?.button2Color ?? ''}
            fullWidth={true}
          >
            {committeesMegaMenu?.button2Text ?? ''}
          </Button>
        </div>
      </div>
      <div className="w-full overflow-hidden md:my-2 md:px-2 md:w-1/3 lg:my-6 lg:px-6">
        <div className="h-full pt-6 px-6 pb-12 border-solid border-b-4 border-brand-blue bg-brand-gray">
          <h4 className="mb-2 nova uppercase text-brand-blue">
            {committeesMegaMenu?.block2Committee?.name ?? ''}
          </h4>
          <ul>
            <li className="mb-2">
              <Link
                href={`/committees/${committeesMegaMenu?.block2Committee?.slug}/`}
              >
                <a>Overview</a>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href={`/committees/${committeesMegaMenu?.block2Committee?.slug}/work-plans/`}
              >
                <a>Workplan Items</a>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href={`/committees/${committeesMegaMenu?.block2Committee?.slug}/accomplishments/`}
              >
                <a>Accomplishments</a>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href={`/committees/${committeesMegaMenu?.block2Committee?.slug}/resources/`}
              >
                <a>Resources</a>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href={`/committees/${committeesMegaMenu?.block2Committee?.slug}/co-chairs/`}
              >
                <a>Co-Chairs</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full overflow-hidden md:my-2 md:px-2 md:w-1/3 lg:my-6 lg:px-6 border-solid">
        <div className="h-full pt-6 px-6 pb-12 border-solid border-b-4 border-brand-green bg-brand-gray">
          <h4 className="mb-2 nova uppercase text-brand-green">
            {committeesMegaMenu?.block3Committee?.name ?? ''}
          </h4>
          <ul>
            <li className="mb-2">
              <Link
                href={`/committees/${committeesMegaMenu?.block3Committee?.slug}/`}
              >
                <a>Overview</a>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href={`/committees/${committeesMegaMenu?.block3Committee?.slug}/work-plans/`}
              >
                <a>Workplan Items</a>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href={`/committees/${committeesMegaMenu?.block3Committee?.slug}/accomplishments/`}
              >
                <a>Accomplishments</a>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href={`/committees/${committeesMegaMenu?.block3Committee?.slug}/resources/`}
              >
                <a>Resources</a>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href={`/committees/${committeesMegaMenu?.block3Committee?.slug}/co-chairs/`}
              >
                <a>Co-Chairs</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full overflow-hidden md:my-2 md:px-2 md:w-1/3 lg:my-6 lg:px-6 border-solid">
        <div className="h-full pt-6 px-6 pb-12 border-solid border-b-4 border-brand-purple bg-brand-gray">
          <h4 className="mb-2 nova uppercase text-brand-purple">
            {committeesMegaMenu?.block4Committee?.name ?? ''}
          </h4>
          <ul>
            <li className="mb-2">
              <Link
                href={`/committees/${committeesMegaMenu?.block4Committee?.slug}/`}
              >
                <a>Overview</a>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href={`/committees/${committeesMegaMenu?.block4Committee?.slug}/work-plans/`}
              >
                <a>Workplan Items</a>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href={`/committees/${committeesMegaMenu?.block4Committee?.slug}/accomplishments/`}
              >
                <a>Accomplishments</a>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href={`/committees/${committeesMegaMenu?.block4Committee?.slug}/resources/`}
              >
                <a>Resources</a>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href={`/committees/${committeesMegaMenu?.block4Committee?.slug}/co-chairs/`}
              >
                <a>Co-Chairs</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full overflow-hidden md:my-2 md:px-2 md:w-1/3 lg:my-6 lg:px-6 border-solid">
        <div className="h-full pt-6 px-6 pb-12 border-solid border-b-4 border-brand-orange bg-brand-gray">
          <h4 className="mb-2 nova uppercase text-brand-orange">
            {committeesMegaMenu?.block5Committee?.name ?? ''}
          </h4>
          <ul>
            <li className="mb-2">
              <Link
                href={`/committees/${committeesMegaMenu?.block5Committee?.slug}/`}
              >
                <a>Overview</a>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href={`/committees/${committeesMegaMenu?.block5Committee?.slug}/work-plans/`}
              >
                <a>Workplan Items</a>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href={`/committees/${committeesMegaMenu?.block5Committee?.slug}/accomplishments/`}
              >
                <a>Accomplishments</a>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href={`/committees/${committeesMegaMenu?.block5Committee?.slug}/resources/`}
              >
                <a>Resources</a>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href={`/committees/${committeesMegaMenu?.block5Committee?.slug}/co-chairs/`}
              >
                <a>Co-Chairs</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full overflow-hidden md:my-2 md:px-2 md:w-1/3 lg:my-6 lg:px-6">
        <div className="h-full pt-6 px-6 pb-12 border-solid border-b-4 border-brand-navy bg-brand-gray">
          <h4 className="mb-2 nova uppercase text-brand-navy">
            {committeesMegaMenu?.block6Committee?.name ?? ''}
          </h4>
          <ul>
            <li className="mb-2">
              <Link
                href={`/committees/${committeesMegaMenu?.block6Committee?.slug}/`}
              >
                <a>Overview</a>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href={`/committees/${committeesMegaMenu?.block6Committee?.slug}/work-plans/`}
              >
                <a>Workplan Items</a>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href={`/committees/${committeesMegaMenu?.block6Committee?.slug}/accomplishments/`}
              >
                <a>Accomplishments</a>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href={`/committees/${committeesMegaMenu?.block6Committee?.slug}/resources/`}
              >
                <a>Resources</a>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href={`/committees/${committeesMegaMenu?.block6Committee?.slug}/co-chairs/`}
              >
                <a>Co-Chairs</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
);

export default memo(CommitteesMegaMenu);
