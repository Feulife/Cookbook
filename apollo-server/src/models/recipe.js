import mongoose from "mongoose";

// Define the recipe's database schema
const recipeSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    // reference the author's object ID
    author : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    favoriteCount: {
      type: Number,
      default: 0
    },
    favoritedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
  },
  // Assimgs createdAt and updatedAt fields with a Date type
  {
    timestamps: true
  },
);

export const Recipe = mongoose.model('Recipe', recipeSchema);