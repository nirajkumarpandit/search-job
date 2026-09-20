import mongoose from "mongoose";

const resumeAnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    resumeUrl: {
      type: String,
      required: true
    },
    resumeScore: {
      type: Number,
      min: 0,
      max: 100
    },

    skills: {
      languages: [String],
      frontend: [String],
      backend: [String],
      database: [String],
      tools: [String]
    },

    strengths: [String],

    weaknesses: [String],

    missingSkills: [String],

    improvements: [String],

    recommendedRoles: [String]
  },
  {
    timestamps: true
  }
);

const ResumeAnalysis=mongoose.model('ResumeAnalysis',resumeAnalysisSchema)
export default ResumeAnalysis