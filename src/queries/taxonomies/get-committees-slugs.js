import { gql } from '@apollo/client';
//import MenuFragment from "../fragments/menus";
//import { HeaderFooter } from '../get-menus';
//import SeoFragment from '../fragments/seo';
import CommitteesFragment from '../fragments/committees';

export const GET_COMMITTEES_SLUGS = gql`
	query GET_COMMITTEES_SLUGS {
		committees {
			...CommitteesFragment
		}
	}
	${CommitteesFragment}
`;
