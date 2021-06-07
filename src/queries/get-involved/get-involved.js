import { gql } from '@apollo/client'
import {HeaderFooter} from "../get-menus";


export const GET_INVOLVED = gql`


query MyQuery {
    ${HeaderFooter}
    pageBy(uri: "/get-involved/") {
    getInvolved {
    accordionTab1ButtonText
    accordionTab1ButtonUrl
    accordionTab1Text
    accordionTab2Text
    circleButtonText
    circleButtonUrl
    col1Icon {
    altText
    sourceUrl(size: LARGE)
    title(format: RENDERED)
    }
    col1Image {
    altText
    title(format: RENDERED)
    sourceUrl(size: LARGE)
    }
    col1Text
    col2Icon {
    altText
    title(format: RENDERED)
    sourceUrl(size: LARGE)
    }
    col2Image {
    altText
    sourceUrl(size: LARGE)
    title(format: RENDERED)
    }
    col2Text
    col3Icon {
    altText
    title(format: RENDERED)
    sourceUrl(size: LARGE)
    }
    col3Image {
    altText
    title(format: RENDERED)
    sourceUrl(size: LARGE)
    }
    col3Text
    col4Icon {
    altText
    title(format: RENDERED)
    sourceUrl(size: LARGE)
    }
    col4Image {
    altText
    title(format: RENDERED)
    sourceUrl(size: LARGE)
    }
    col4Text
    form1Checkboxes {
    labelAndValue
    }
    form1CheckboxesHeading
    form1CheckboxesIntroText
    form1CheckboxesName
    form1Fields {
    label
    name
    }
    form1FooterHeading
    form1FooterText
    form1Heading
    form1SubmitButtonText
    form1ThankYouPopupButtonText
    form1ThankYouPopupButtonUrl
    form1ThankYouPopupHeading
    form1ThankYouPopupImage {
    altText
    sourceUrl(size: LARGE)
    title(format: RENDERED)
    }
    form1ThankYouPopupText
    form2Checkboxes {
    labelAndValue
    }
    form2CheckboxesHeading
    form2CheckboxesIntroText
    form2CheckboxesName
    form2Fields {
    label
    name
    }
    form2Heading
    form2FooterText
    form2SubmitButtonText
    form2ThankYouPopupHeading
    form2ThankYouPopupImage {
    altText
    sourceUrl(size: LARGE)
    title(format: RENDERED)
    }
    form2ThankYouPopupText
    headerText
    headerImage {
    altText
    sourceUrl(size: LARGE)
    title(format: RENDERED)
    }
    headerTitle
    mainHeading
    membersPopupAccordion {
    tab
    tabContent
    }
    membersPopupHeading
    membersPopupIntroText
    }
    }
    }

`