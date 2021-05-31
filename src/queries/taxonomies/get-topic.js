import { gql } from '@apollo/client';
//import MenuFragment from "../fragments/menus";
import { HeaderFooter } from '../get-menus';
//import TopicsFragment from '../fragments/topics';
//import SeoFragment from '../fragments/seo'; //Use TaxonomySEO

export const GET_TOPIC = gql`
	query GET_TOPIC($slug: ID!) {
		${HeaderFooter}
		topic(idType: SLUG, id: $slug) {
			Topic {
				title
				backgroundImage {
					altText
					sourceUrl
					title(format: RAW)
				}
				highlightsButtonText
				highlightsButtonUrl
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
