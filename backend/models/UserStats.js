import mongoose from "mongoose";

const userStatsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },

    // ✅ ADD THESE TWO
    articleScore: { type: Number, default: 0 },
    gameScore: { type: Number, default: 0 },

    totalScore: { type: Number, default: 0 },

    gamesPlayed: { type: Number, default: 0 },
    articlesRead: { type: Number, default: 0 },
    quizzesTaken: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now },

    playedSessions: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("UserStats", userStatsSchema);
