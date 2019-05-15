// @flow

import * as React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Item from '../components/Item';
import Voting from '../components/Voting';
import SearchInput from '../components/SearchInput';

type Props = {|
  history: { push: ({}) => mixed },
  location: {
    pathname: string,
    search: string,
  },
  match: {},
|};

export const FEED_QUERY = gql`
  query FeedQuery($query: String, $cursor: Cursor) {
    feed(first: 20, after: $cursor, query: $query) {
      totalCount
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          type
          title
          url
          by {
            id
            username
          }
          createdAt
          rating
          canVote
        }
      }
    }
  }
`;

const FEED_SUBSCRIPTION = gql`
  subscription onItemAdded {
    itemAdded {
      cursor
      node {
        id
        type
        title
        url
        by {
          id
          username
        }
        createdAt
        rating
        canVote
      }
    }
  }
`;

const VOTE_SUBSCRIPTION = gql`
  subscription onVote {
    voted {
      item {
        cursor
        node {
          id
          type
          title
          url
          by {
            id
            username
          }
          createdAt
          rating
          canVote
        }
      }
    }
  }
`;

const VOTE_MUTATION = gql`
  mutation VoteMutation($input: VoteInput!) {
    vote(input: $input) {
      item {
        cursor
        node {
          id
          rating
          canVote
        }
      }
    }
  }
`;

const subscribeToNewItems = subscribeToMore => {
  subscribeToMore({
    document: FEED_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const newItemEdge = subscriptionData.data.itemAdded;
      const exists = prev.feed.edges.find(
        ({ node: { id } }) => id === newItemEdge.node.id
      );

      if (exists) return prev;

      return {
        ...prev,
        feed: {
          ...prev.feed,
          totalCount: prev.feed.totalCount + 1,
          edges: [newItemEdge, ...prev.feed.edges],
        },
      };
    },
  });
};

const subscribeToNewVotes = subscribeToMore => {
  subscribeToMore({
    document: VOTE_SUBSCRIPTION,
  });
};

const parseQuery = search => {
  return new URLSearchParams(search).get('q') || '';
};

const Feed = ({ history, location }: Props) => {
  const [searchQuery, setSearchQuery] = React.useState(
    parseQuery(location.search)
  );

  React.useEffect(() => {
    history.push({
      search: searchQuery ? `?q=${searchQuery}` : '',
    });
  }, [searchQuery, history]);

  return (
    <>
      <SearchInput value={searchQuery} onChange={setSearchQuery} />
      <Query query={FEED_QUERY} variables={{ query: searchQuery.trim() }}>
        {({ loading, error, data, fetchMore, subscribeToMore }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          subscribeToNewItems(subscribeToMore);
          subscribeToNewVotes(subscribeToMore);

          const onLoadMore = () => {
            fetchMore({
              variables: {
                cursor: data.feed.edges[data.feed.edges.length - 1].cursor,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                const newEdges = fetchMoreResult.feed.edges;
                const pageInfo = fetchMoreResult.feed.pageInfo;

                return newEdges.length
                  ? {
                      feed: {
                        ...previousResult.feed,
                        edges: [...previousResult.feed.edges, ...newEdges],
                        pageInfo,
                      },
                    }
                  : previousResult;
              },
            });
          };

          return (
            <>
              {data.feed.edges.length === 0 &&
                (searchQuery ? (
                  <p>
                    No results matching <strong>{searchQuery}</strong>
                  </p>
                ) : (
                  <p>No results</p>
                ))}

              {data.feed.edges.map(({ node }) => {
                return (
                  <Mutation mutation={VOTE_MUTATION} key={node.id}>
                    {vote => (
                      <Item
                        id={node.id}
                        type={node.type}
                        title={node.title}
                        url={node.url}
                        by={node.by}
                        createdAt={node.createdAt}
                        points={node.rating}
                        renderVoting={() => (
                          <Voting
                            disabled={!node.canVote}
                            onVoteUp={() =>
                              vote({
                                variables: {
                                  input: {
                                    item: node.id,
                                    type: 'UP',
                                  },
                                },
                              })
                            }
                            onVoteDown={() =>
                              vote({
                                variables: {
                                  input: {
                                    item: node.id,
                                    type: 'DOWN',
                                  },
                                },
                              })
                            }
                          />
                        )}
                      />
                    )}
                  </Mutation>
                );
              })}

              {data.feed.pageInfo.hasNextPage && (
                <button type="button" onClick={onLoadMore}>
                  Load More
                </button>
              )}
            </>
          );
        }}
      </Query>
    </>
  );
};

export default Feed;
