import { gql } from '@apollo/client';
//import MenuFragment from "../fragments/menus";
import { HeaderFooter } from '../get-menus';
import SeoFragment from '../fragments/seo';

export const GET_COMMITMENTS_PAGE = gql`
	query GET_COMMITMENTS_PAGE($uri: String) {
		${HeaderFooter}
	  page: pageBy(uri: $uri) {
			workPlansAndCommitments {
				backgroundImage {
					altText
					title(format: RENDERED)
					sourceUrl(size: LARGE)
				}
				description
			}
	    id
	    title(format: RENDERED)
	    slug
			seo {
				...SeoFragment
			}
		}
		commitments {
			nodes {
				commitment {
					backgroundImage {
						altText
						title(format: RENDERED)
						sourceUrl(size: LARGE)
					}
					year
				}
			}
	  }
	}
	${SeoFragment}
`;
