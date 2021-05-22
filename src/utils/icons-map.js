import * as SvgIconsComponent from '../components/icons';
import Image from 'next/image';

/**
 * Icons Component map.
 *
 * @param {string} name Icon Name.
 * @returns {*}
 */
export const getIconComponentByName = ( name ) => {
	const ComponentsMap = {
		facebook: SvgIconsComponent.Facebook,
		twitter: SvgIconsComponent.Twitter,
		instagram: SvgIconsComponent.Instagram,
		youtube: SvgIconsComponent.Youtube
	};

	if ( name in ComponentsMap ) {
		const IconComponent = ComponentsMap[name];
		return <IconComponent />;
	} else {
		return null;
	}
};

export const getTopicIconByName = name => {
	const TopicIconsMap = {
		Lead: <Image src="/images/lead.png" width={14} height={19} alt="Lead" />,
	};

	return Object.keys(TopicIconsMap).includes(name) ? TopicIconsMap[name] : null;
};

export const getTypeIconByName = name => {
	const TypeIconsMap = {
		'Guides &amp; Toolkits': <Image src="/images/toolkit.png" width={18} height={18} alt="Guides & Toolkits" />,
	};

	return Object.keys(TypeIconsMap).includes(name) ? TypeIconsMap[name] : null;
};

export const getCommitteeIconsByName = name => {
	const CommitteeIconsMap = {
		'Asset Management and Finance Committee': <Image src="/images/asset-management-and-finance-committee.png" width={89} height={89} alt="Asset Management and Finance Committee" />,
		'Combined Sewer Overflow Committee': <Image src="/images/combined-sewer-overflow-committee.png" width={88} height={89} alt="Combined Sewer Overflow Committee" />,
		'Green Infrastructure Committee': <Image src="/images/green-infrastructure-committee.png" width={89} height={89} alt="Green Infrastructure Committee" />,
		'Education and Outreach Committee': <Image src="/images/education-and-outreach-committee.png" width={89} height={89} alt="Education and Outreach Committee" />,
	};

	return Object.keys(CommitteeIconsMap).includes(name) ? CommitteeIconsMap[name] : null;
};