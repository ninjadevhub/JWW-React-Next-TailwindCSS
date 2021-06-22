import { gql } from '@apollo/client'
//import MenuFragment from "../fragments/menus";
import { HeaderFooter } from '../get-menus'
import SeoFragment from '../fragments/seo'

export const GET_RESOURCES_PAGE = gql`
	query GET_RESOURCES_PAGE($uri: String) {
		${HeaderFooter}
	  page: pageBy(uri: $uri) {
	    id
	    title
	    content
	    slug
	    uri
			resources {
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
	  committees {
			nodes {
				name
				slug
				Committee {
					title
				}
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
		types {
			nodes {
				name
				slug
			}
		}
	}
	${SeoFragment}
`
