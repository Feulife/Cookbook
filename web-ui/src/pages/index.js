import React from "react";
import { useQuery, gql } from "@apollo/client";
import {
  BrowserRouter,
  Route,
  Redirect,
  BrowserRouter,
} from "react-router-dom";

import Layout from "../components/Layout.js";

import Home from "./home.js";
import MyRecipes from "./myrecipes.js";
import Favorites from "./favorites.js";
import Recipe from "./recipe.js";
import SingUp from "./signup.js";
import SingIn from "./signin.js";
import NewRecipe from "./new.js";
import EditRecipe from "./edit.js";

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const Pages = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/myrecipes" component={MyRecipes} />
        <PrivateRoute path="/favorites" component={Favorites} />
        <Route path="/recipe/:id" component={Recipe} />
        <Route path="/singup" component={SingUp} />
        <Route path="/singin" component={SingIn} />
        <PrivateRoute path="/new" component={NewRecipe} />
        <PrivateRoute path="/edit/:id" component={EditRecipe} />
      </Layout>
    </BrowserRouter>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return (
    <Route
      {...rest}
      render={(props) =>
        data.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default Pages;
