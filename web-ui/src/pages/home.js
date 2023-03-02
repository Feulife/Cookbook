import React from 'react';
import { useQuery } from '@apollo/client';

import RecipeFeed from '../components/RecipeFeed';
import Button from '../components/Button';
import { GET_RECIPES } from '../gql/query';

const Home = () => {
  // query hook
  const { data, loading, error, fetchMore } = useQuery(GET_RECIPES);
  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;

  // if the data is successful, display the data in our UI
  return (
    <React.Fragment>
      <RecipeFeed rcipes={data.recipeFeed.recipes} />
      {data.recipeFeed.hasNextPage && (
        <Button
          onClick={() =>
            fetchMore({
              variables: {
                cursor: data.recipeFeed.cursor
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                  recipeFeed: {
                    cursor: fetchMoreResult.recipeFeed.cursor,
                    hasNextPage: fetchMoreResult.recipeFeed.hasNextPage,
                    // combine the new results and the old
                    recipes: [
                      ...previousResult.recipeFeed.recipes,
                      ...fetchMoreResult.recipeFeed.recipes
                    ],
                    __typename: 'recipeFeed'
                  }
                };
              }
            })
          }
        >
          Load more
        </Button>
      )}
    </React.Fragment>
  );
};

export default Home;
