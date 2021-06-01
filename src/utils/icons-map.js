import * as IconsComponent from '../components/icons';
import Image from 'next/image';

/**
 * Icons Component map.
 *
 * @param {string} name Icon Name.
 * @returns {*}
 */
export const getIconComponentByName = ( name ) => {
	const ComponentsMap = {
		facebook: IconsComponent.Facebook,
		twitter: IconsComponent.Twitter,
		instagram: IconsComponent.Instagram,
		youtube: IconsComponent.Youtube,
		email: IconsComponent.Email,
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

export const getTopicCircleIconBySlug = slug => {
	const TopicCircleIconsMap = {
		lead: <Image src="/images/lead-icon-in-green-circle.png" width={80} height={80} alt="Lead Icon in Green Circle" />,
	};
	
	return Object.keys(TopicCircleIconsMap).includes(slug) ? TopicCircleIconsMap[slug] : <div className="rounded-full bg-brand-green" style={{ width: 80, height: 80 }} />;
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