import React from "react";
import { useSelector } from "react-redux";

const AnalysisData = () => {

    const { analysis } = useSelector(
        (store) => store.resumeAnalysis
    );

    if (!analysis) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-10 text-center">
                <p className="text-gray-500">
                    No resume analysis found.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">

            {/* Hero Section */}
            <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                    Resume{" "}
                    <span className="text-violet-600">
                        Analyzer
                    </span>
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Get AI-powered insights to improve your resume
                    and stand out from the crowd.
                </p>
            </div>

            {/* Main Content */}
            <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">

                {/* LEFT */}
                <div className="space-y-5">

                    {/* ATS Score */}
                    <div className="bg-white border rounded-xl p-5 shadow-sm">
                        <h3 className="font-bold text-lg">
                            Resume Score
                        </h3>

                        <p className="text-4xl font-extrabold text-violet-600 mt-3">
                            {analysis.resumeScore}
                            <span className="text-lg text-gray-400">
                                /100
                            </span>
                        </p>
                    </div>

                    {/* Skills */}
                    <div className="bg-white border rounded-xl p-5 shadow-sm">
                        <h3 className="font-bold text-lg mb-4">
                            Skills Found
                        </h3>

                        <div className="space-y-3">
                            <div>
                                <p className="font-medium text-sm">
                                    Languages
                                </p>

                                <div className="flex flex-wrap gap-2 mt-2">
                                    {analysis.skills.languages.map(
                                        (skill, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-violet-50 text-violet-600 rounded-full text-sm"
                                            >
                                                {skill}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>

                            <div>
                                <p className="font-medium text-sm">
                                    Frontend
                                </p>

                                <div className="flex flex-wrap gap-2 mt-2">
                                    {analysis.skills.frontend.map(
                                        (skill, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-violet-50 text-violet-600 rounded-full text-sm"
                                            >
                                                {skill}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>

                            <div>
                                <p className="font-medium text-sm">
                                    Backend
                                </p>

                                <div className="flex flex-wrap gap-2 mt-2">
                                    {analysis.skills.backend.map(
                                        (skill, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-violet-50 text-violet-600 rounded-full text-sm"
                                            >
                                                {skill}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>

                            <div>
                                <p className="font-medium text-sm">
                                    Database
                                </p>

                                <div className="flex flex-wrap gap-2 mt-2">
                                    {analysis.skills.database.map(
                                        (skill, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-violet-50 text-violet-600 rounded-full text-sm"
                                            >
                                                {skill}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>

                            <div>
                                <p className="font-medium text-sm">
                                    Tools
                                </p>

                                <div className="flex flex-wrap gap-2 mt-2">
                                    {analysis.skills.tools.map(
                                        (skill, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-violet-50 text-violet-600 rounded-full text-sm"
                                            >
                                                {skill}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Missing Skills */}
                    <div className="bg-white border rounded-xl p-5 shadow-sm">
                        <h3 className="font-bold text-lg">
                            Missing Skills
                        </h3>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {analysis.missingSkills.map(
                                (skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                )
                            )}
                        </div>
                    </div>

                </div>

                {/* RIGHT */}
                <div className="space-y-5">

                    {/* Recommended Roles */}
                    <div className="bg-white border rounded-xl p-5 shadow-sm">
                        <h3 className="font-bold text-lg">
                            Recommended Roles
                        </h3>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {analysis.recommendedRoles.map(
                                (role, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-2 bg-violet-50 text-violet-700 rounded-full text-sm"
                                    >
                                        {role}
                                    </span>
                                )
                            )}
                        </div>
                    </div>

                    {/* Strengths */}
                    <div className="bg-white border rounded-xl p-5 shadow-sm">
                        <h3 className="font-bold text-lg">
                            Strengths
                        </h3>

                        <ul className="mt-4 space-y-2">
                            {analysis.strengths.map(
                                (item, index) => (
                                    <li
                                        key={index}
                                        className="text-sm text-gray-600"
                                    >
                                        ✓ {item}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    {/* Improvements */}
                    <div className="bg-white border rounded-xl p-5 shadow-sm">
                        <h3 className="font-bold text-lg">
                            Areas for Improvement
                        </h3>

                        <ul className="mt-4 space-y-2">
                            {analysis.improvements.map(
                                (item, index) => (
                                    <li
                                        key={index}
                                        className="text-sm text-gray-600"
                                    >
                                        • {item}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                </div>
            </div>

            {/* AI Suggestions */}
            <div className="mt-5 bg-violet-50 border border-violet-100 rounded-xl p-5">
                <h3 className="font-bold text-lg">
                    ✨ AI Suggestions
                </h3>

                <ul className="mt-4 space-y-2">
                    {analysis.improvements.map(
                        (item, index) => (
                            <li
                                key={index}
                                className="text-sm text-gray-700"
                            >
                                {index + 1}. {item}
                            </li>
                        )
                    )}
                </ul>
            </div>

        </div>
    );
};

export default AnalysisData;