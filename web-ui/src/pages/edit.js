import React from 'react';
import { useMutation, useQuery } from '@apollo/client';

// import the RecipeForm component
import RecipeForm from '../components/RecipeForm';
import { GET_RECIPE, GET_ME } from '../gql/query.js';
import { EDIT_RECIPE } from '../gql/mutation.js';

const EditRecipe = props => {
  // store the id found in the url as a variable
  const id = props.match.params.id;
  // define our recipe query
  const { loading, error, data } = useQuery(GET_RECIPE, { variables: { id } });
  const { data: userdata } = useQuery(GET_ME);
  // define our mutation
  const [editRecipe] = useMutation(EDIT_RECIPE, {
    variables: {
      id
    },
    onCompleted: () => {
      props.history.push(`/recipe/${id}`);
    }
  });

  // if the data is loading, display a loading message
  if (loading) return 'Loading...';
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;
  // if the current user and the author of the recipe do not match
  if (userdata.me.id !== data.recipe.author.id) {
    return <p>You do not have access to edit this recipe</p>;
  }

  // pass the data and mutation to the form component
  return <RecipeForm content={data.recipe.content} action={editRecipe} />;
};

export default EditRecipe;
