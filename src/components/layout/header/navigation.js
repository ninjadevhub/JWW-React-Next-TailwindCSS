import { isLinkActive } from '../../../utils/miscellaneous';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../../styles/components/layout/header/navigation.module.scss';

export default function Navigation({ menu, className, committeesMegaMenuRef, committeesMegaMenuIsActive }) {
  const { asPath } = useRouter();
  const megaMenuMap = {
    '/committees/asset-management-and-finance-committee/': committeesMegaMenuRef,
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
                    <Link href={item.path}>
                      <a
                        target={item.target ? item.target : '_self'}
                        className={cn(
                          'nav-item',
                          (isLinkActive(asPath, item.path) || (item.path === '/committees/asset-management-and-finance-committee/' && committeesMegaMenuIsActive)) && styles.active  
                        )}
                        onMouseEnter={() => {
                          const megaMenuClassList = megaMenuMap[item.path]?.current?.classList;
                          megaMenuClassList?.remove('hidden');
                          megaMenuClassList?.add('flex');
                        }}
                        onMouseLeave={() => {
                          const megaMenuClassList = megaMenuMap[item.path]?.current?.classList;
                          megaMenuClassList?.remove('flex');
                          megaMenuClassList?.add('hidden');
                        }}
                      >
                        {item.label}
                      </a>
                    </Link>
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
