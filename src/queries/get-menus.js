import { gql } from "@apollo/client";
import MenuFragment from "./fragments/menus";

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
`

export const GET_MENUS = gql`
query GET_MENUS {
  ${HeaderFooter}
}
  ${MenuFragment}
`
