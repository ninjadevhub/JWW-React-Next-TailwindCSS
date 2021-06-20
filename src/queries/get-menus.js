import { gql } from '@apollo/client';
import MenuFragment from './fragments/menus';

export const HeaderFooter = `
  header: getHeader {
    favicon
    siteLogoUrl
    siteTagLine
    siteTitle
  },
  menus {
    nodes {
      locations
      menuItems {
        nodes {
          id
          parentId
          label
          path
          target
          title
          childItems {
            nodes {
              id
              parentId
              label
              path
              target
              title
            }
          }
        }
      }
    }
  },
  sitewideSettings {
    committeesMegaMenu {
      button1Color
      button1Text
      button1Url
      button2Color
      button2Text
      button2Url
      block2Committee {
        slug
        name
      }
      block3Committee {
        slug
        name
      }
      block4Committee {
        name
        slug
      }
      block5Committee {
        name
        slug
      }
      block6Committee {
        name
        slug
      }
    }
        latestNewsMegaMenu {
          block1Button1Color
          block1Button1Text
          block1Button1Url
          block1Button2Color
          block1Button2Text
          block1Button2Url
          block2Heading
          block2Topics2 {
            topic {
              name
              slug
            }
          }
        }
    resourcesMegaMenu {
      block4Heading
      block4Types {
        type {
          name
          slug
        }
      }
      block2Heading
      block2Topics1 {
        topic {
          name
          slug
        }
      }
      block3Heading
      block5Committees {
        committee {
          name
          slug
        }
      }
      block5Heading
      block6Heading
      block6MoreLinkText
      block6MoreLinkUrl
      block6VideosWebinars {
        video {
          ... on Video {
            id
            slug
            title(format: RENDERED)
          }
        }
      }
      button1Color
      button1Text
      button1Url
      button2Color
      button2Text
      button2Url
    }
    workPlansMegaMenu {
      block1ButtonColor
      block1ButtonText
      block1ButtonUrl
      block1Image {
        altText
        sourceUrl(size: LARGE)
        title(format: RENDERED)
      }
      block2ButtonColor
      block2ButtonText
      block2ButtonUrl
      block2Image {
        altText
        title(format: RENDERED)
        sourceUrl(size: LARGE)
      }
    }
  },
  footer: getFooter {
    copyrightText
    sidebarOne
    sidebarTwo
    socialLinks {
      iconName
      iconUrl
    }
  }
`;

export const GET_MENUS = gql`
query GET_MENUS {
  ${HeaderFooter}
}
  ${MenuFragment}
`;
