import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    content: [
      {
        type: String,
      },
    ],
    likedBy: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    likedCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Tweet = mongoose.model("Tweet", tweetSchema);
