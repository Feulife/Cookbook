const user = {
  // list of recipes when requested
  recipes: async (user, args, { models }) => {
    return await Recipe.find({ author: user._id }).sort({ _id: -1 });
  },

  // list of favorites when requested
  favorites: async (user, args, { models }) => {
    return await Recipe.find({ author: user._id }).sort({ _id: -1 });
  },
};

export default user;