import Link from 'next/link';

const defaultClassName = 'inline-block py-2 px-8 text-center';

export default function Button({
  className,
  style,
  uri,
  onClick,
  color = 'brand-blue',
  fullWidth,
  ghost,
  children,
}) {
  const finalClassName = `${defaultClassName} bg-${ghost ? 'white' : color} text-${ghost ? color : 'white'}${ghost ? ` border-solid border-2 border-${color}` : ''}${
    fullWidth ? ' w-full' : ''
  } ${className}`;
  if (typeof uri !== 'undefined') {
    return (
      <Link href={uri}>
        <a className={finalClassName} style={style ? style : {}}>{children}</a>
      </Link>
    );
  } else if (typeof onClick === 'function') {
    return (
      <button className={finalClassName} style={style ? style : {}} type="button" onClick={onClick}>
        {children}
      </button>
    );
  }

  return null;
}
