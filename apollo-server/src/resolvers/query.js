const query = {
  
    recipes: async (parent, args, { models }) => {
      return await models.Recipe.find().limit(100);
    },
    recipe: async (parent, args, { models }) => {
      return await models.Recipe.findById(args.id);
    },
    user: async (parent, args, { models }) => {
      return await models.User.findOne({ username: args.username });
    },
    users: async (parent, args, { models }) => {
      return await models.User.find({}).limit(100);
    },
    me: async (parent, args, { models, user }) => {
      return await models.User.findById(user.id);
    },
    recipeFeed: async (parent, { cursor }, { models }) => {
      // hard code the limit to 10 items
      const limit = 10;
      // set the default hasNextPage value to false
      let hasNextPage = false;
      // if no cursor is passed the default query will be empty
      // this will pull the newest recipes from the db
      let cursorQuery = {};

      // if there is a cursor
      // our query will look for recipes with an ObjectId less than that of the cursor
      if (cursor) {
        cursorQuery = { _id: { $lt: cursor } };
      }

      // find the limit + 1 of recipes in our db, sorted newest to oldest
      let recipes = await models.Recipe.find(cursorQuery)
        .sort({ _id: -1 })
        .limit(limit + 1);

      // if the number of recipes we find exceeds our limit
      // set hasNextPage to true & trim the recipes to the limit
      if (recipes.length > limit) {
        hasNextPage = true;
        recipes = recipes.slice(0, -1);
      }

      // the new cursor will be the Mongo ObjectID of the last item in the feed array
      const newCursor = recipes[recipes.length - 1]._id;

      return {
        recipes,
        cursor: newCursor,
        hasNextPage,
      };
    },
  
};

export default query;