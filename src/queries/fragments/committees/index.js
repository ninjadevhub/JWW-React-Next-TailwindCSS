const CommitteesFragment = `
fragment CommitteesFragment on RootQueryToCommitteeConnection {
  nodes {
    name
    slug
  }
}
`;
export default CommitteesFragment;
