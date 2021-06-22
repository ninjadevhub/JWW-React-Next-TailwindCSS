import { gql } from '@apollo/client';
//import MenuFragment from "../fragments/menus";
import { HeaderFooter } from '../get-menus';
//import TopicsFragment from '../fragments/topics';
//import SeoFragment from '../fragments/seo'; //Use TaxonomySEO

export const GET_TOPIC = gql`
	query GET_TOPIC($slug: ID!) {
		${HeaderFooter}
    topicOverviews {
      nodes {
        title(format: RENDERED)
        topicOverview {
          backgroundImage {
            altText
            title(format: RENDERED)
            sourceUrl(size: LARGE)
          }
          description
          highlightsButtonText
          highlightsButtonUrl
          topic {
            name
            slug
          }
          topicIcon {
            altText
            sourceUrl(size: LARGE)
            title(format: RENDERED)
          }
        }
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
