import { gql } from '@apollo/client';
//import MenuFragment from "../fragments/menus";
import { HeaderFooter } from '../get-menus';
//import CommitteesFragment from '../fragments/topics';
//import SeoFragment from '../fragments/seo'; //Use TaxonomySEO

export const GET_COMMITTEE = gql`
	query GET_COMMITTEE($slug: ID!) {
		${HeaderFooter}
		committee(idType: SLUG, id: $slug) {
			Committee {
				title
				backgroundImage {
					altText
					sourceUrl
					title(format: RAW)
				}
			}
			slug
			name
			description
		}
		topics {
			nodes {
				name
				slug
			}
		}
		committees {
			nodes {
				name
				slug
			}
		}
		types {
			nodes {
				name
				slug
			}
		}
		newsSources {
			nodes {
				name
				slug
			}
		}
		workPlans {
			nodes {
				title(format: RENDERED)
				workPlan {
					year
					committee {
						name
						slug
					}
				}
				content(format: RENDERED)
			}
		}
		accomplishments {
			nodes {
				accomplishments {
					committee {
						slug
					}
					accomplishments {
						accomplishment
					}
					year
				}
			}
		}
		coChairs {
			nodes {
				coChair {
					committee {
						slug
					}
					associationName
					associationUrl
					firstName
					lastName
					image {
						altText
						title(format: RENDERED)
						sourceUrl(size: LARGE)
					}
				}
				coChairId
			}
		}
	}
`;
