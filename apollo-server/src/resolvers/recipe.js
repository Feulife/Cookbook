module.exports = {
  author: async (recipe, args, { models }) => {
    return await models.User.findById(recipe.aithor);
  },
  favoritedBy: async (recipe, args, { models }) => {
    return await models.User.find({ _id: { $in: recipe.favoritedBy }})
  }
};