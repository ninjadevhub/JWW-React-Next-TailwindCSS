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
	}
`;
