import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import ButtonAsLink from './ButtonAsLink';
import { TOGGLE_FAVORITE } from '../gql/mutation.js';
import { GET_MY_FAVORITES } from '../gql/query.js';

const FavoriteNote = props => {
  // store the recipe's favorite count as state
  const [count, setCount] = useState(props.favoriteCount);
  // store if the user has favorited the recipe as state
  const [favorited, setFavorited] = useState(
    // check if the recipe exists in the user favorites list
    props.me.favorites.filter(recipe => recipe.id === props.recipeId).length > 0
  );

  // toggleFavorite mutation hook
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    variables: {
      id: props.recipeId
    },
    // refetch the GET_MY_FAVORITES query to update the cache
    refetchQueries: [{ query: GET_MY_FAVORITES }]
  });

  // if the user has favorited the recipe display the option to remove the favorite
  // else display the option to add as a favorite
  return (
    <React.Fragment>
      {favorited ? (
        <ButtonAsLink
          onClick={() => {
            toggleFavorite();
            setFavorited(false);
            setCount(count - 1);
          }}
          data-cy="favorite"
        >
          Remove Favorite
        </ButtonAsLink>
      ) : (
        <ButtonAsLink
          onClick={() => {
            toggleFavorite();
            setFavorited(true);
            setCount(count + 1);
          }}
          data-cy="favorite"
        >
          Add Favorite
        </ButtonAsLink>
      )}
      : {count}
    </React.Fragment>
  );
};

export default FavoriteNote;
