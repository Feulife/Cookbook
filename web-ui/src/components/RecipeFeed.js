import { Link } from "react-router-dom";
import styled from "styled-components";
import Recipe from "./Recipe.js";

const RecipeWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 2em;
  padding-bottom: 2em;
  border-bottom: 1px solid #f5f4f0;
`;

const RecipeFeed = ({ recipes }) => {
  return (
    <div className="recipe-feed">
      {recipes.map((recipe) => (
        <RecipeWrapper key={recipe.id}>
          <Recipe recipe={recipe} />
          <Link to={`recipe/${recipe.id}`}>Permalink</Link>
        </RecipeWrapper>
      ))}
    </div>
  );
};

export default RecipeFeed;
