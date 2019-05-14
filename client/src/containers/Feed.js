import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Item from '../components/Item';
import Voting from '../components/Voting';

const FeedQuery = gql`
  query FeedQuery($cursor: Cursor) {
    allItems(first: 20, after: $cursor) {
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

const VoteMutation = gql`
  mutation Vote($input: VoteInput!) {
    vote(input: $input) {
      item {
        id
        rating
        canVote
      }
    }
  }
`;

const Feed = () => {
  return (
    <Query query={FeedQuery}>
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        const onLoadMore = () => {
          fetchMore({
            variables: {
              cursor:
                data.allItems.edges[data.allItems.edges.length - 1].cursor,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              const newEdges = fetchMoreResult.allItems.edges;
              const pageInfo = fetchMoreResult.allItems.pageInfo;

              return newEdges.length
                ? {
                    allItems: {
                      __typename: previousResult.allItems.__typename,
                      edges: [...previousResult.allItems.edges, ...newEdges],
                      pageInfo,
                    },
                  }
                : previousResult;
            },
          });
        };

        return (
          <>
            {data.allItems.edges.map(({ node }) => {
              return (
                <Mutation mutation={VoteMutation} key={node.id}>
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
                                input: { item: node.id, type: 'UP' },
                              },
                            })
                          }
                          onVoteDown={() =>
                            vote({
                              variables: {
                                input: { item: node.id, type: 'DOWN' },
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

            {data.allItems.pageInfo.hasNextPage && (
              <button type="button" onClick={onLoadMore}>
                Load More
              </button>
            )}
          </>
        );
      }}
    </Query>
  );
};

export default Feed;
