import React from "react";
import { useQuery } from "@apollo/client";
import Recipe from '../components/Recipe.js';
import { GET_RECIPE } from "../gql/query.js";

const RecipePage = props => {
  // store the id found in the url as a variable
  let id = props.match.params.id;

  // query hook, passing the id value as a variable
  const { loading, error, data } = useQuery(GET_RECIPE, { variables: { id } });

  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;

  // if there is an error fetching the data, display an error message
  if (error) return <p>Error! Recipe not found</p>;

  // if the data is successful, display the data in our UI
  return <Recipe recipe={data.recipe} />
};

export default RecipePage;