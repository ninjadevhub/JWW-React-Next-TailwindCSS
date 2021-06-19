import { gql } from '@apollo/client';
//import MenuFragment from "../fragments/menus";
import { HeaderFooter } from '../get-menus';
import SeoFragment from '../fragments/seo';

export const GET_MEMBER_RESOURCES_PAGE = gql`
	query GET_MEMBER_RESOURCES_PAGE($uri: String) {
		${HeaderFooter}
	  page: pageBy(uri: $uri) {
	    memberResources {
        accordion1Card1Heading
        accordion1Card1Image {
          title(format: RENDERED)
          sourceUrl(size: LARGE)
        }
        accordion1Card1PdfUrl
        accordion1Card2Heading
        accordion1Card2Image {
          altText
          title(format: RENDERED)
          sourceUrl
        }
        accordion1Card3Heading
        accordion1Card3Image {
          altText
          title(format: RENDERED)
          sourceUrl
        }
        accordion1Heading
        accordion2Content
        accordion2Heading
        accordion3Heading
        accordion3Pdf1Description
        accordion3Pdf1Url
        accordion3Pdf2Description
        accordion3Pdf2Url
        accordion3Pdf3Description
        accordion3Pdf3Url
        accordion3Pdf4Description
        accordion3Pdf4Url
        accordion4Heading
        accordion4ResourceDescription
        accordion4ResourceName
        accordion4ResourceUrl
        accordion5Description
        accordion5Heading
        accordion5Logo {
          altText
          sourceUrl(size: LARGE)
          title(format: RENDERED)
        }
        accordion6Heading
        accordion6ResourceDescription
        accordion6ResourceName
        accordion6ResourceUrl
        accordion7Heading
        bottomPanelButtonText
        bottomPanelButtonUrl
        bottomPanelContent
        bottomPanelHeading
        bottomPanelImage {
          altText
          sourceUrl(size: LARGE)
          title(format: RENDERED)
        }
        headerImage {
          altText
          title(format: RENDERED)
          sourceUrl(size: LARGE)
        }
        popupHeading
        popupIntro
        section7VideoDescription
        section7VideoEmbed
        popupSections {
          list {
            itemContent
            itemTitle
          }
          paragraph
          paragraphOrList
          sectionHeading
          sectionIcon {
            altText
            title(format: RENDERED)
            sourceUrl(size: LARGE)
          }
        }
      }
	    seo {
        ...SeoFragment
      }
	  }
	}
	${SeoFragment}
`;
