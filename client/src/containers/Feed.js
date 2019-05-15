// @flow

import * as React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Item from '../components/Item';
import Voting from '../components/Voting';
import SearchInput from '../components/SearchInput';

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

type Data = {
  feed: {
    totalCount: number,
    edges: [
      {|
        cursor: string,
        node: {
          id: string,
        },
      |},
    ],
    pageInfo: {
      hasNextPage: boolean,
    },
  },
};
const onLoadMore = (fetchMore: Function, data: Data) => {
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

const Feed = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <>
      <SearchInput value={searchQuery} onChange={setSearchQuery} />
      <Query query={FEED_QUERY} variables={{ query: searchQuery }}>
        {({ loading, error, data, fetchMore, subscribeToMore }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          subscribeToNewItems(subscribeToMore);

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
                <button
                  type="button"
                  onClick={() => onLoadMore(onLoadMore, data)}
                >
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
