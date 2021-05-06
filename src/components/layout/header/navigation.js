import { isLinkActive } from '../../../utils/miscellaneous';
import cn from 'classnames'
import Link from 'next/link'
import {useRouter} from 'next/router'
import styles from '../../../styles/components/layout/header/navigation.module.scss'

export default function Navigation({menu, className}) {
  const {asPath} = useRouter()
  return (
    <>
      {!!menu?.length && (
        <nav className={cn(styles.navigation, className)}>
          <ul>
            {menu.map((item, index) => {
              const children =
                item.children && item.children.length > 0 ? item.children : '';

              return (
                <li key={index}>
                  <Link href={item.path}>
                    <a
                      target={item.target ? item.target : '_self'}
                      className={cn(
                        'nav-item',
                        isLinkActive(asPath, item.path) && styles.active
                      )}
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
                        )
                      })}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </>
  )
}
