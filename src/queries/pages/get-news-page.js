import { gql } from "@apollo/client";
//import MenuFragment from "../fragments/menus";
import {HeaderFooter} from "../get-menus";
import SeoFragment from "../fragments/seo";

export const GET_NEWS_PAGE = gql`
	query GET_NEWS_PAGE($uri: String) {
		${HeaderFooter}
	  page: pageBy(uri: $uri) {
	    id
	    title
	    content
	    slug
	    uri
			news {
				sliderImages {
					image {
						altText
						title(format: RAW)
						sourceUrl(size: LARGE)
					}
				}
			}
	    seo {
        ...SeoFragment
      }
	  }
		topics {
			nodes {
				name
				slug
				Topic {
					title
				}
			}
		}
		news_sources {
			nodes {
				name
				slug
			}
		}
	}
	${SeoFragment}
`;
