import { isLinkActive } from '../../../utils/miscellaneous';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../../styles/components/layout/header/navigation.module.scss';

export default function Navigation({
  menu,
  className,
  committeesMegaMenuRef,
  //committeesMegaMenuIsActive,
  resourcesMegaMenuRef,
  //resourcesMegaMenuIsActive,
  latestNewsMegaMenuRef,
  //latestNewsMegaMenuIsActive,
  workPlansMegaMenuRef,
  //workPlansMegaMenuIsActive,
  eventsMegaMenuRef,
  setActiveMegaMenuRef,
}) {
  const { asPath } = useRouter();
  const megaMenuMap = {
    '/committees/': committeesMegaMenuRef,
    '/resources/': resourcesMegaMenuRef,
    '/latest-news/': latestNewsMegaMenuRef,
    '/work-plans/': workPlansMegaMenuRef,
    '/events/': eventsMegaMenuRef,
  };

  return (
    <>
      {!!menu?.length && (
        <nav className={cn('navigation', styles.navigation, className)}>
          <ul>
            {menu.reduce((arr, item, index) => {
              const children =
                item.childItems?.nodes && item.childItems?.nodes?.length > 0
                  ? item.childItems?.nodes
                  : null;

              if (!item.parentId) {
                arr.push(
                  <li key={index}>
                    <a
                      href={item.path}
                      target={item.target ? item.target : '_self'}
                      className={cn(
                        'nav-item',
                        isLinkActive(asPath, item.path) /*|| 
                        (item.path === '/committees/asset-management-and-finance-committee/' && committeesMegaMenuIsActive) ||
                        (item.path === '/resources/' && resourcesMegaMenuIsActive) ||
                        (item.path === '/latest-news/' && latestNewsMegaMenuIsActive) ||
                        (item.path === '/work-plans/' && workPlansMegaMenuIsActive))*/ && styles.active  
                      )}
                      onClick={event => {
                        event.preventDefault();
                        const megaMenuRef = megaMenuMap[item.path];
                        //console.log('mmr', megaMenuRef, 'cmmr', committeesMegaMenuRef)
                        //const megaMenuClassList = megaMenuRef?.current?.classList;
                        document.querySelectorAll('.nav-item').forEach(link => {
                          if (link !== event.currentTarget) {
                            link.classList.remove('active');
                          } else if (!event.currentTarget.classList?.contains('active')) {
                            event.currentTarget.classList?.add('active');
                          } else {
                            event.currentTarget.classList?.remove('active');
                          }
                        });

                        document.querySelectorAll('.mega-menu').forEach(menu => {
                          //console.log('mi', menu.id, 'mmrci', megaMenuRef?.current?.id, 'ectc', event.currentTarget.classList)
                          if (menu.id !== megaMenuRef?.current?.id) {
                            menu.classList.add('hidden');
                            menu.classList.remove('flex');
                          } else if (event.currentTarget.classList?.contains('active')) {
                            megaMenuRef?.current?.classList?.add('flex');
                            megaMenuRef?.current?.classList?.remove('hidden');
                            setActiveMegaMenuRef(megaMenuRef);
                          } else {
                            megaMenuRef?.current?.classList?.add('hidden');
                            megaMenuRef?.current?.classList?.remove('flex');
                            setActiveMegaMenuRef(null);
                          }
                        });
                      }}
                        /*onMouseEnter={() => {
                          const megaMenuClassList = megaMenuMap[item.path]?.current?.classList;
                          megaMenuClassList?.remove('hidden');
                          megaMenuClassList?.add('flex');
                        }}
                        onMouseLeave={() => {
                          const megaMenuClassList = megaMenuMap[item.path]?.current?.classList;
                          megaMenuClassList?.remove('flex');
                          megaMenuClassList?.add('hidden');
                        }}*/
                    >
                      {item.label}
                    </a>
                    {children && (
                      <ul>
                        {children.map((item, index) => {
                          return (
                            <li key={index}>
                              <Link href={item.path}>
                                <a
                                  target={item.target ? item.target : '_self'}
                                  className={cn(
                                    'nav-item',
                                    isLinkActive(asPath, item.path) &&
                                      styles.active
                                  )}
                                >
                                  {item.label}
                                </a>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              }
              return arr;
            }, [])}
          </ul>
        </nav>
      )}
    </>
  );
}
