const TopicsFragment = `
fragment TopicsFragment on RootQueryToTopicConnection {
  nodes {
    name
    slug
  }
}
`;
export default TopicsFragment;
