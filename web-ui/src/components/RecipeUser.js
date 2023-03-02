import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import DeleteRecipe from './DeleteRecipee';
import FavoriteRecipe from './FavoriteRecipe';
import { GET_ME } from '../gql/query';

const RecipeUser = props => {
  const { loading, error, data } = useQuery(GET_ME);
  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;

  return (
    <React.Fragment>
      <FavoriteRecipe
        me={data.me}
        recipeId={props.recipe.id}
        favoriteCount={props.recipe.favoriteCount}
      />
      <br />
      {data.me.id === props.recipe.author.id && (
        <React.Fragment>
          <Link to={`/edit/${props.recipe.id}`}>Edit</Link> <br />
          <DeleteRecipe noteId={props.recipe.id} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default RecipeUser;
