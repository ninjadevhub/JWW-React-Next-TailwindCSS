
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

 export const GET_VIDEO_TAGS = gql`
    query GetVideoTags {
        videoTags {
            nodes {
                id
                name
                slug
            }
        }
    }
 `

 export const GET_VIDEOS_WITH_TAGS = gql`
    query GetVideosWithTags {
        videos {
            nodes { 
                date
                content(format: RENDERED)
                videoId
                videoTags {
                    nodes {
                        name
                        slug
                    }
                }
            title(format: RENDERED)
                video {
                    video
                    videoId
                }
            }
        }
    }
 `
 