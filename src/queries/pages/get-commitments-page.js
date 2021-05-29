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
        commitmentsDescription
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
        title(format: RENDERED)
        content(format: RENDERED)
        slug
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
