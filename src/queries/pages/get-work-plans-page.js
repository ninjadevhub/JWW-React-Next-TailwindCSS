import { gql } from '@apollo/client';
//import MenuFragment from "../fragments/menus";
import { HeaderFooter } from '../get-menus';
import SeoFragment from '../fragments/seo';

export const GET_WORK_PLANS_PAGE = gql`
	query GET_WORK_PLANS_PAGE($uri: String) {
		${HeaderFooter}
	  page: pageBy(uri: $uri) {
			workPlansAndCommitments {
				backgroundImage {
					altText
					title(format: RENDERED)
					sourceUrl(size: LARGE)
				}
				description
				workPlansDescription
			}
	    id
	    title(format: RENDERED)
	    slug
			seo {
				...SeoFragment
			}
		}
		workPlans(first: 100) {
			nodes {
				workPlan {
					year
					heading
					description
					boxes {
						text
						image {
							altText
							title(format: RENDERED)
							sourceUrl(size: LARGE)
						}
					}
				}
			}
	  }
	}
	${SeoFragment}
`;
