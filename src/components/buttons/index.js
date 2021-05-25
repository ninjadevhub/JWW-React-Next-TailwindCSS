import Link from 'next/link';

const defaultClassName = 'inline-block py-2 px-8 text-center text-white';

export default function Button({
  className,
  uri,
  onClick,
  color = 'brand-blue',
  fullWidth,
  children,
}) {
  const finalClassName = `${defaultClassName} bg-${color}${
    fullWidth ? ' w-full' : ''
  } ${className}`;
  if (uri) {
    return (
      <Link href={uri}>
        <a className={finalClassName}>{children}</a>
      </Link>
    );
  } else if (typeof onClick === 'function') {
    return (
      <button className={finalClassName} type="button" onClick={onClick}>
        {children}
      </button>
    );
  }
}
