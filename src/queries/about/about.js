import { gql } from '@apollo/client'
import {HeaderFooter} from "../get-menus";



export const GET_ABOUT_JERSEY_WATER = gql`
query MyQuery {
  ${HeaderFooter}
  pageBy(uri: "/about/") {
    about {
      aboutTabBoxContent1
      aboutTabBoxContent2
      aboutTabHeading
      aboutTabSolutions {
        solution
      }
      aboutTabSolutionsButtonText
      aboutTabSolutionsButtonUrl
      aboutTabSolutionsHeading
      aboutTabText
      backboneStaffTabBoxHeading
      backboneStaffTabText
      backboneStaffWork1Logo {
        altText
        sourceUrl(size: LARGE)
        title(format: RENDERED)
      }
      backboneStaffWork1Text
      backboneStaffWork2Logo {
        altText
        title(format: RENDERED)
        sourceUrl(size: LARGE)
      }
      backboneStaffWork2Text
      committeeMembersHeading
      committeeRoles {
        role
        roleIcon {
          altText
          sourceUrl
          title(format: RENDERED)
        }
      }
      goalsTabButtonText
      goalsTabButtonUrl
      goalsTabHeading
      goalsTabText
      headerButtonText
      headerButtonUrl
      headerImage {
        altText
        sourceUrl(size: LARGE)
        title(format: RENDERED)
      }
      headerText
      headerTitle
      honoraryCoChairs {
        coChairName
        coChairTitles
        coChairProfilePicture {
          altText
          sourceUrl(size: LARGE)
          title(format: RENDERED)
        }
      }
      honoraryCoChairsHeading
      leadersTabText
      members {
        memberHeading
        memberText
      }
      membersButton1Text
      membersButton1Url
      membersButton2Text
      membersButton2Url
      membersHeading
      steeringCommitteeHeading
      steeringCommitteeText
      modalHeading
      modalList1 {
        item
      }
      modalList1Heading
      modalList2 {
        item
      }
      modalList2Heading
      modalText
      modalIcon {
        altText
        sourceUrl(size: LARGE)
        title(format: RENDERED)
      }
    }
  }
  goals {
    nodes {
      goal {
        committee {
          name
          slug
        }
        goalText
        subGoals {
          subGoalContent
          subGoalTitle
        }
      }
      title(format: RENDERED)
      goalId
    }
  }
  backboneStaffMembers {
    nodes {
      backboneStaffMemberId
      title(format: RENDERED)
      backboneStaff {
        firstName
        lastName
        linkText
        linkUrl
        profilePicture {
          altText
          title(format: RENDERED)
          sourceUrl(size: LARGE)
        }
        title
        workLogo {
          altText
          title(format: RENDERED)
          sourceUrl(size: LARGE)
        }
        workText
      }
    }
  }
  yearHighlights {
    nodes {
      title(format: RENDERED)
      yearHighlightId
      yearHighlights {
        slides {
          slideHeading
          slideText
        }
        yearHeading
      }
    }
  }
  steeringCommitteeMembers {
    nodes {
      title(format: RENDERED)
      steeringCommitteeMemberId
      committeeMember {
        firstName
        lastName
        profileImage {
          altText
          title(format: RENDERED)
          sourceUrl(size: LARGE)
        }
        workplaceLinkText
        workplaceLinkUrl
        title
      }
    }
  }
}
`