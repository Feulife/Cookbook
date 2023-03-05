import React from 'react';
import { useMutation } from '@apollo/client';
// import { withRouter } from 'react-router-dom';

import ButtonAsLink from './ButtonAsLink';
import { DELETE_RECIPE } from '../gql/mutation';
import { GET_MY_RECIPES, GET_RECIPES } from '../gql/query';

const DeleteRecipe = props => {
  const [deleteRecipe] = useMutation(DELETE_RECIPE, {
    variables: {
      id: props.recipeId
    },
    // refetch the note list queries to update the cache
    refetchQueries: [{ query: GET_MY_RECIPES, GET_RECIPES }],
    onCompleted: data => {
      // redirect the user to the "my recipes" page
      props.history.push('/myrecipes');
    }
  });

  return <ButtonAsLink onClick={deleteRecipe}>Delete Recipe</ButtonAsLink>;
};

export default DeleteRecipe;
