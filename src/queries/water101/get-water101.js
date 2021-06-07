import { gql } from '@apollo/client'
import {HeaderFooter} from "../get-menus";





export const GET_WATER_101 = gql`
query MyQuery {
    ${HeaderFooter}
    pageBy(uri: "/water-101/") {
    water101 {
    businessesButtonText
    businessesButtonUrl
    businessesHeading
    businessesImage {
    altText
    sourceUrl(size: LARGE)
    title(format: RENDERED)
    }
    businessesList {
    itemText
    itemUrl
    }
    businessesSubheading
    headerImage {
    altText
    title(format: RENDERED)
    sourceUrl
    }
    headerText
    individualsButtonText
    individualsButtonUrl
    individualsHeading
    individualsImage {
    altText
    title(format: RENDERED)
    sourceUrl(size: LARGE)
    }
    individualsList {
    itemText
    itemUrl
    }
    individualsSubheading
    municipalitiesButtonText
    municipalitiesButtonUrl
    municipalitiesHeading
    municipalitiesImage {
    altText
    sourceUrl
    title(format: RENDERED)
    }
    municipalitiesList {
    itemText
    itemUrl
    }
    municipalitiesSubheading
    }
    }
    }
 `;