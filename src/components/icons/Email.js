import * as React from 'react';
import Image from 'next/image';

const displayEmailIcon = (width, height) => (
	<Image
		src="/images/email.png"
		width={width || 37}
		height={height || 37}
		alt="Email Icon"
	/>
);

function Email( props ) {
	if (props.onClick) {
		return (
			<button
				type="button"
				className={`p-0 border-none bg-transparent${props.className ? ' ' + props.className : ''}`}
				{...props}
			>
				{displayEmailIcon(props.width, props.height)}
			</button>
		);
	}

	return (
		<a
			href={props.href ? props.href : ''}
			className={`inline-block${props.className ? ' ' + props.className : ''}`}
			{...props}
		>
			{displayEmailIcon(props.width, props.height)}
		</a>
	);
}

export default Email;
