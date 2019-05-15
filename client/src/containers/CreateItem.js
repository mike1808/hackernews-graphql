// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import CreateItemForm from '../components/CreateItemForm';
import { FEED_QUERY } from './Feed';

type Props = {
  history: { push: string => mixed },
};

const ITEM_MUTATION = gql`
  mutation ItemMutation($input: PostLinkInput!) {
    postLink(input: $input) {
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

const CreateItem = ({ history }: Props) => {
  return (
    <div>
      <Mutation
        mutation={ITEM_MUTATION}
        update={(
          cache,
          {
            data: {
              postLink: { item },
            },
          }
        ) => {
          let data;
          try {
            data = cache.readQuery({
              query: FEED_QUERY,
              variables: { query: '' },
            });
          } catch {} // feed wasn't fetched

          if (!data) return;

          data.feed.totalCount += 1;
          data.feed.edges.unshift(item);

          cache.writeQuery({
            query: FEED_QUERY,
            data,
          });
        }}
        onCompleted={() => history.push('/')}
      >
        {postLink => {
          return (
            <CreateItemForm
              onSubmit={values => postLink({ variables: { input: values } })}
            />
          );
        }}
      </Mutation>
    </div>
  );
};

CreateItem.propTypes = {
  history: PropTypes.object.isRequired,
};

export default CreateItem;
