import React from 'react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import RecipeUser from './RecipeUser.js';
import { IS_LOGGED_IN } from '../gql/query.js';

// Keep recipes from extending wider than 800px
const StyledRecipe = styled.article`
  max-width: 800px;
  margin: 0 auto;
`;

// Style the recipe meta data
const MetaData = styled.div`
  @media (min-width: 500px) {
    display: flex;
    align-items: top;
  }
`;

// add some space between the avatar and meta info
const MetaInfo = styled.div`
  padding-right: 1em;
`;

// align 'Favorites' to the right on large screens
const UserActions = styled.div`
  margin-left: auto;
`;

const Recipe = ({ recipe }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;

  return (
    <StyledRecipe>
      <MetaData>
        <MetaInfo>
          <img
            src={recipe.author.avatar}
            alt={`${recipe.author.username} avatar`}
            height="50px"
          />
        </MetaInfo>
        <MetaInfo>
          <em>by</em> {recipe.author.username} <br />
          {format(recipe.createdAt, 'MMM Do YYYY')}
        </MetaInfo>
        {data.isLoggedIn ? (
          <UserActions>
            <RecipeUser recipe={recipe} />
          </UserActions>
        ) : (
          <UserActions>
            <em>Favorites:</em> {recipe.favoriteCount}
          </UserActions>
        )}
      </MetaData>
      <ReactMarkdown source={recipe.content} />
    </StyledRecipe>
  );
};

export default Recipe;
