import React, { useState, useEffect } from "react";
import { Loader2, ArrowRight, Book } from "lucide-react";
import Link from "next/link";
import axios from "axios";

const AssessmentList = () => {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "/api/questions/0x6518D50aDc9036Df37119eA465a8159E34417E2E"
        );
        setCourseData(data);
        console.log(data);
      } catch (err) {
        setError("Failed to fetch assessments");
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading assessments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-20 px-8">
        <div className="p-4 rounded-lg bg-red-50 text-red-500">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="ml-4 text-sm underline hover:text-red-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!courseData?.data?.courses?.length) {
    return (
      <div className="max-w-4xl mx-auto mt-20 px-8">
        <div className="p-4 rounded-lg bg-gray-50 text-gray-500">
          No assessments available
          <button
            onClick={() => window.location.reload()}
            className="ml-4 text-sm underline hover:text-gray-600"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-20 px-8 pb-20">
      <div className="mb-12">
        <h1 className="text-3xl font-light mb-2">Available Assessments</h1>
        <p className="text-gray-600">Select an assessment to begin</p>
      </div>

      <div className="space-y-8">
        {courseData.data.courses.map((course) => {
          // Get only the last question
          const lastQuestionIndex = course.questions.length - 1;
          const lastQuestion = course.questions[lastQuestionIndex];

          return (
            <div
              key={course.courseId}
              className="border rounded-lg overflow-hidden"
            >
              <div className="p-6 border-b bg-gray-50">
                <div className="flex items-center gap-3">
                  <Book className="h-5 w-5 text-gray-500" />
                  <h2 className="text-xl font-light">
                    {course.courseDetails.title}
                  </h2>
                </div>
              </div>

              <div className="divide-y">
                <div className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg mb-1">
                        Assessment {lastQuestionIndex + 1}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {lastQuestion.questions.length} questions
                      </p>
                    </div>
                    <Link
                      href={`/certificate/assesment/${course.courseId}_${lastQuestionIndex}`}
                      className="flex items-center gap-2 px-6 py-2 rounded bg-black text-white hover:bg-gray-900 transition-colors"
                    >
                      Start Assessment
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssessmentList;
