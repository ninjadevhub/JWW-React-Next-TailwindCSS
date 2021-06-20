import { gql } from '@apollo/client';
//import MenuFragment from "../fragments/menus";
//import { HeaderFooter } from '../get-menus';
//import SeoFragment from '../fragments/seo';

export const GET_TOPICS_SLUGS = gql`
	query GET_TOPICS_SLUGS {
    topicOverviews {
      nodes {
        topicOverview {
          topic {
            slug
          }
        }
      }
    }
	}
`;
