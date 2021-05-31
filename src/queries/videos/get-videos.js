
import { gql } from '@apollo/client'
import {HeaderFooter} from "../get-menus";

/**
 * Get Videos
 *
 */
export const GET_VIDEOS = gql`
    query GetVideos {
        ${HeaderFooter}
        videos {
            nodes {
                id
                title
                video {
                    video
                    videoId
                }
            }
        }
    }
 `;