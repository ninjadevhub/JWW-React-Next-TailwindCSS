import { gql } from '@apollo/client'
import {HeaderFooter} from "../get-menus";



export const GET_HOME_PAGE = gql`

query MyQuery {
    ${HeaderFooter}
    pageBy(uri: "/") {
            home {
            featuredVideo {
            ... on Video {
            videoId
            video {
            video
      }
        slug
        title(format: RENDERED)
     }
    }
        featuredVideoButtonText
        featuredVideoButtonUrl
        featuredVideoHeading
        featuredVideoSubheading
        rightColLink1Heading
        rightColLink1Image {
          altText
          sourceUrl
          title(format: RENDERED)
        }
        rightColLink1Url
        rightColLink2Heading
        rightColLink2Image {
            altText
            title(format: RENDERED)
            sourceUrl(size: LARGE)
        }
        rightColLink2Url
        rightColLink3Heading
     rightColLink3Image {
            altText
            title(format: RENDERED)
          sourceUrl(size: LARGE)
          }
    rightColLink3Url
        slide {
        button1IconClass
        button1Text
        button1Url
        button2IconClass
        button2Text
        button2Url
    slideImage {
        altText
        title(format: RENDERED)
        sourceUrl(size: LARGE)
        }
     }
        sliderBottomHeader
        sliderBottomLink1Text
        sliderBottomLink1Url
        sliderBottomLink2Text
        sliderBottomLink2Url
        sliderBottomLink3Text
        sliderBottomLink3Url
        sliderBottomLink4Text
        sliderBottomLink4Url
        whatsNewSectionHeading
        }
      }
    }

 `;