import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import RecipeFeed from '../components/RecipeFeed';
import { GET_MY_RECIPES } from '../gql/query';

const MyRecipes = () => {
  useEffect(() => {
    // update the document title
    document.title = 'My Recipes — CookBook';
  });

  const { loading, error, data } = useQuery(GET_MY_RECIPES);

  // if the data is loading, our app will display a loading message
  if (loading) return 'Loading...';
  // if there is an error fetching the data, display an error message
  if (error) return `Error! ${error.message}`;
  // if the query is successful and there are recipes, return the feed of recipes
  // else if the query is successful and there aren't recipes, display a message
  if (data.me.recipes.length !== 0) {
    return <RecipeFeed recipes={data.me.recipes} />;
  } else {
    return <p>No recipes yet</p>;
  }
};

export default MyRecipes;