import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import RecipeFeed from '../components/RecipeFeed';
import { GET_MY_FAVORITES } from '../gql/query';

const Favorites = () => {
  useEffect(() => {
    // update the document title
    document.title = 'Favorites — CookBook';
  });

  const { loading, error, data } = useQuery(GET_MY_FAVORITES);

  // if the data is loading, our app will display a loading message
  if (loading) return 'Loading...';
  // if there is an error fetching the data, display an error message
  if (error) return `Error! ${error.message}`;
  // if the query is successful and there are recipes, return the feed of recipes
  // else if the query is successful and there aren't recipes, display a message
  if (data.me.favorites.length !== 0) {
    return <RecipeFeed recipes={data.me.favorites} />;
  } else {
    return <p>No favorites yet</p>;
  }
};

export default Favorites;
