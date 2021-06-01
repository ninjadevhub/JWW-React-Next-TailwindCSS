import * as React from 'react';
import Image from 'next/image';

const displayInstagramIcon = (width, height) => (
	<Image
		src="/images/instagram.png"
		width={width || 36}
		height={height || 36}
		alt="Instagram Icon"
	/>
);

function Instagram( props ) {
	if (props.onClick) {
		return (
			<button
				type="button"
				className={`p-0 border-none bg-transparent${props.className ? ' ' + props.className : ''}`}
				{...props}
			>
				{displayInstagramIcon(props.width, props.height)}
			</button>
		);
	}

	return (
		<a
			href={props.href ? props.href : ''}
			className={`inline-block${props.className ? ' ' + props.className : ''}`}
			{...props}
		>
			{displayInstagramIcon(props.width, props.height)}
		</a>
	);
}

export default Instagram;
