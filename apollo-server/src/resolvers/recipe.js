export const recipe = {
  // author info when requested
  author: async (recipe, args, { models }) => {
    return await models.User.findById(recipe.aithor)
  },
  // favoritedBy info when requested
  favoritedBy: async (recipe, args, { models }) => {
    return await models.User.find({ _id: { $in: recipe.favoritedBy }})
  }
};