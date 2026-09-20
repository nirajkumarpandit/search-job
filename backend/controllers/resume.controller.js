import ResumeAnalysis from "../models/resumeAnalysis.model.js";
import User from "../models/user.model.js";
import analyzeResume from "../services/gemini.service.js";

const analyzeResumeController = async (req, res) => {
    try {
        const userId = req.id
        // logged-in user find karo
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const resumeUrl = user.profile.resume
        if (!resumeUrl) {
            return res.status(400).json({
                success: false,
                message: "Please upload a resume first"
            });
        }
        // check existing analysis
        const existAnalysis = await ResumeAnalysis.findOne({ userId })
        if (existAnalysis && existAnalysis.resumeUrl === resumeUrl) {
            return res.status(200).json({
                success: true,
                message: "Existing analysis found",
                analysis: existAnalysis
            })
        }

        const analysis = await analyzeResume(resumeUrl);
        // Save / update analysis in MongoDB
        const savedAnalysis = await ResumeAnalysis.findOneAndUpdate(
            { userId },
            {
                userId,
                resumeUrl,
                ...analysis
            },
            {
                new: true,
                upsert: true
            }
        );
        return res.status(200).json({
            success: true,
            message: "Resume analyzed successfully",
            analysis: savedAnalysis
        });

    } catch (error) {
        console.error("Resume Analysis Error:", error);
        // agar limit gemini ka limit reach ho jata hai hai to ye error aayega
        if (
            error.status === 429 ||
            error.message?.includes("Rate limit") ||
            error.message?.includes("quota")
        ) {
            return res.status(429).json({
                success: false,
                message: "AI analysis limit reached."
            });
        }
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export default analyzeResumeController