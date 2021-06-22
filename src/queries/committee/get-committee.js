import { gql } from '@apollo/client';
//import MenuFragment from "../fragments/menus";
import { HeaderFooter } from '../get-menus';
//import CommitteesFragment from '../fragments/topics';
//import SeoFragment from '../fragments/seo'; //Use TaxonomySEO

export const GET_COMMITTEE = gql`
	query GET_COMMITTEE($slug: ID!) {
		${HeaderFooter}
    committeeOverview(id: $slug, idType: SLUG) {
      committeeOverview {
        backgroundImage {
          altText
          title(format: RENDERED)
          sourceUrl(size: LARGE)
        }
        committee {
          name
          slug
        }
        committeeIcon {
          altText
          title(format: RENDERED)
          sourceUrl(size: LARGE)
        }
        description
      }
      title(format: RENDERED)
		}
    committees {
      nodes {
        name
        slug
      }
    }
		topics {
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
		workPlans(first: 100) {
			nodes {
				workPlan {
					year
					committee {
						slug
					}
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
		accomplishments {
			nodes {
				accomplishments {
					committee {
						slug
					}
					accomplishments {
						accomplishment
					}
					year
				}
			}
		}
		coChairs {
			nodes {
				coChair {
					committee {
						slug
					}
					associationName
					associationUrl
					firstName
					lastName
					image {
						altText
						title(format: RENDERED)
						sourceUrl(size: LARGE)
					}
				}
				coChairId
			}
		}
	}
`;
