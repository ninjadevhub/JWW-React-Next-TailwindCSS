import { gql } from '@apollo/client';
//import MenuFragment from "../fragments/menus";
//import { HeaderFooter } from '../get-menus';
//import SeoFragment from '../fragments/seo';

export const GET_COMMITTEES_SLUGS = gql`
	query GET_COMMITTEES_SLUGS {
		committeeOverviews {
			nodes {
				committeeOverview {
					committee {
						slug
					}
        }
      }
		}
	}
`;
