import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthenticationError, ForbiddenError } from '@apollo/server';
import mongoose from 'mongoose';
dotenv.config();

// import gravatar from '../util/gravatar';

const mutation = {
  newRecipe: async (parent, args, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to create a note');
    }

    return await Recipe.create({
      content: args.content,
      author: mongoose.Types.ObjectId(user.id),
      favoriteCount: 0
    });
  },

  deleteRecipe: async (parent, { id }, { models, user }) => {
    // If not a user, throw an Authentication Error
    if (!user) {
      throw new AuthenticationError('Yuomust be signed in to delete a note');
    }
  
    // find ther recipe
    const recipe = await Recipe.findById(id);
    // if the recipe owner and current user don't match, throw a forbidden error
    if (recipe && String(recipe.author) !== user.id) {
      throw new ForbiddenError("You don't have permissions to delete the recipe");
    }
  
    try {
      // if evrything cheks out, remove the note
      await recipe.remove();
      return true;  
    } catch (err) {
      // if there's an error along the way, return false
      return false;
    }
  },
  updateRecipe: async (parent, { content, id }, { models, user }) => {
    // If not a user, throw an Athentication Error
    if (!user) {
      throw new AuthenticationError('You must be signed in to update a recipe');
    }

    // find the recipe
    const recipe = await Recipe.findById(id);
    // If the recipe owner and current user don't match, throw a forbidden error
    if (recipe && String(recipe.author) !== user.id) {
      throw new ForbiddenError("You don't have permissions to update the recipe");
    }

    // Update the recipe in the db and return the updated recipe
    return await Recipe.findOneAndUpdate(
      {
        _id: id
      },
      {
        $set: {
          content
        }
      },
      {
        new: true
      }
    );
  },
  toggleFavorite: async (parent, { id }, { module, user }) => {
    // If no user context is passed, throw new error
    if (!user) {
      throw new AuthenticationError();
    }
    // check to see if the user has alredy favorited the recipe
    let recipeCheck = await Recipe.findById(id);
    const hasUser = recipeCheck.favoritedBy.indexOf(user.id);
    // if the user exists in the list
    // pull them from the list and reduce the favoriteCount by 1
    if (hasUser >= 0) {
      return await Recipe.findByIdAndUpdate(
        id,
        {
          $pull: {
            favoritedBy: mongoose.Types.ObjectId(user.id)
          },
          $inc: {
            favoriteCount: -1
          }
        },
        {
          // Set the new to true to return the updated doc
          new: true
        }
      );
    } else {
      // if the user doesn't exists in the list
      // add them to the list and increment the favoriteCount by 1
      return await Recipe.findByIdAndUpdate(
        id,
        {
          $push: {
            favoritedBy: mongoose.Types.ObjectId(user.id)
          },
          $inc: {
            favoriteCount: 1
          }
        },
        {
          new: true
        }
      );
    }
  },
  singUp: async (parent, { username, email, password }, { models }) => {
    // normalize email addres
    email = email.trim().toLowerCase();
    // hash the password
    const hashed = await bycrypt.hash(password, 10);

    // create the gravatar url
    // const avatar = gravatar(email);

    try {
      const user = await User.create({
        username,
        email,
        // avatar,
        password: hashed
      });

      // create and return the json web token
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
      // throw an error, when there's a problem creating the account
      throw new Error('Error creating account');
    }
  },

  singIn: async (parent, { username, email, password }, { models }) => {
    if (email) {
      email = email.trim().toLowerCase();
    }

    const user = await User.findOne({
      $or: [{ email }, { username }]
    });

    // if no user is found, throw an authentication error
    const valid = await bycrypt.compare(password, user.password);
    if (!valid) {
      throw new AuthenticationError('Error singin in');
    }

    // create and return the json web token
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  }
};
