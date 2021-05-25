import { gql } from '@apollo/client';
//import MenuFragment from "../fragments/menus";
//import { HeaderFooter } from '../get-menus';
//import SeoFragment from '../fragments/seo';
import TopicsFragment from '../fragments/topics';

export const GET_TOPICS_SLUGS = gql`
	query GET_TOPICS_SLUGS {
		topics {
			...TopicsFragment
		}
	}
	${TopicsFragment}
`;
