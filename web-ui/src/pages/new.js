import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import RecipeForm from '../components/RecipeForm';
import { NEW_RECIPE } from '../gql/mutation';
import { GET_MY_RECIPES, GET_RECIPES } from '../gql/query';

const NewRecipe = props => {
  useEffect(() => {
    // update the document title
    document.title = 'New Recipe — CookBook';
  });

  const [data, { loading, error }] = useMutation(NEW_RECIPE, {
    // refetch the GET_RECIPEE and GET_MY_RECIPES queries to update the cache
    refetchQueries: [{ query: GET_MY_RECIPES }, { query: GET_RECIPES }],
    onCompleted: data => {
      // when complete, redirect the user to the recipe page
      props.history.push(`recipe/${data.newRecipe.id}`);
    }
  });

  return (
    <React.Fragment>
      {/* as the mutation is loading, display a loading message*/}
      {loading && <p>Loading...</p>}
      {/* if there is an error, display a error message*/}
      {error && <p>Error saving the recipe</p>}
      {/* the form component, passing the mutation data as a prop */}
      <RecipeForm action={data} />
    </React.Fragment>
  );
};

export default NewRecipe;
