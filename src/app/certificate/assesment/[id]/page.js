"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AssessmentPage = () => {
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assessmentData, setAssessmentData] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchAssessmentData = async () => {
      try {
        setIsLoading(true);
        const [courseId] = id.split("_").map(Number);

        const { data } = await axios.get(
          "/api/questions/0x6518D50aDc9036Df37119eA465a8159E34417E2E"
        );

        if (!data?.data?.courses) {
          throw new Error("Invalid data format");
        }

        const course = data.data.courses.find((c) => c.courseId === courseId);
        if (!course) {
          throw new Error("Course not found");
        }

        // Sort questions by createdAt timestamp in descending order
        const sortedQuestions = [...course.questions].sort((a, b) => {
          const timeA = a.createdAt.seconds + a.createdAt.nanoseconds / 1e9;
          const timeB = b.createdAt.seconds + b.createdAt.nanoseconds / 1e9;
          return timeB - timeA;
        });

        // Get the latest assessment
        const latestAssessment = sortedQuestions[0];
        if (!latestAssessment) {
          throw new Error("No assessments found");
        }

        console.log(course)

        setAssessmentData(course.courseDetails);

        // Transform questions to match the expected format
        const formattedQuestions = latestAssessment.questions.map((q) => ({
          question: q.question,
          options: q.options.map((opt) => opt.replace(/^[A-D]\)\s*/, "")),
          correctAnswer: q.answer.charCodeAt(0) - 65, // Convert 'A', 'B', 'C', 'D' to 0, 1, 2, 3
        }));

        setQuestions(formattedQuestions);
      } catch (err) {
        setError(err.message || "Failed to fetch assessment data");
        console.error("Error fetching assessment:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchAssessmentData();
    }
  }, [id]);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex,
    });
  };

  const calculateScore = () => {
    if (!questions.length) return 0;
    let correct = 0;
    Object.entries(selectedAnswers).forEach(([question, answer]) => {
      if (questions[parseInt(question)].correctAnswer === answer) {
        correct++;
      }
    });
    return (correct / questions.length) * 100;
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading assessment questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-20">
        <Alert variant="destructive">
          <AlertDescription>
            {error}
            <Button
              variant="outline"
              className="ml-4"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="max-w-4xl mx-auto mt-20">
        <Alert>
          <AlertDescription>
            No questions available. Please try again later.
            <Button
              variant="outline"
              className="ml-4"
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const [courseId] = id.split("_");

  return (
    <div className="max-w-4xl mx-auto mt-20 pb-20">
      <Link
        href={`/certificate/assesment`}
        className="flex items-center text-gray-600 mb-12"
      >
        <ChevronLeft size={20} />
        <span className="ml-2">Back to Course</span>
      </Link>

      <div className="mb-12">
        <h1 className="text-3xl font-light mb-2">Technical Assessment</h1>
        <p className="text-gray-600">{assessmentData?.title}</p>
      </div>

      {!showResults ? (
        <div className="space-y-8">
          <div className="flex justify-between items-center mb-8">
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(
                (Object.keys(selectedAnswers).length / questions.length) * 100
              )}
              % Complete
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-xl mb-6">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all
                    ${
                      selectedAnswers[currentQuestion] === index
                        ? "border-black bg-gray-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border ${
                        selectedAnswers[currentQuestion] === index
                          ? "border-4 border-black"
                          : "border-gray-300"
                      }`}
                    />
                    <span
                      className={
                        selectedAnswers[currentQuestion] === index
                          ? "font-medium"
                          : ""
                      }
                    >
                      {option}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-6 border-t">
            <button
              onClick={() =>
                setCurrentQuestion((prev) => Math.max(0, prev - 1))
              }
              disabled={currentQuestion === 0}
              className={`px-6 py-2 rounded ${
                currentQuestion === 0
                  ? "text-gray-300"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Previous
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={
                  Object.keys(selectedAnswers).length !== questions.length
                }
                className={`px-6 py-2 rounded ${
                  Object.keys(selectedAnswers).length !== questions.length
                    ? "bg-gray-100 text-gray-400"
                    : "bg-black text-white hover:bg-gray-900"
                }`}
              >
                Submit Assessment
              </button>
            ) : (
              <button
                onClick={() =>
                  setCurrentQuestion((prev) =>
                    Math.min(questions.length - 1, prev + 1)
                  )
                }
                className="px-6 py-2 rounded bg-black text-white hover:bg-gray-900"
              >
                Next
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="border-b pb-8 mb-8">
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-light">Assessment Complete</h2>
              <span className="text-gray-600">|</span>
              <span className="text-xl">{calculateScore().toFixed(1)}%</span>
            </div>
          </div>

          <div className="space-y-6">
            {questions.map((question, index) => (
              <div key={index} className="border-b pb-6">
                <p className="font-medium mb-4">{question.question}</p>
                <div className="space-y-2">
                  {question.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className={`p-3 rounded ${
                        optIndex === question.correctAnswer
                          ? "bg-gray-50"
                          : selectedAnswers[index] === optIndex
                          ? "bg-gray-50/50"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-1 h-6 rounded ${
                            optIndex === question.correctAnswer
                              ? "bg-green-500"
                              : selectedAnswers[index] === optIndex
                              ? "bg-red-500"
                              : "bg-transparent"
                          }`}
                        />
                        <span
                          className={
                            optIndex === question.correctAnswer
                              ? "font-medium"
                              : ""
                          }
                        >
                          {option}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <Link
              href={`/courses/${courseId}`}
              className="px-6 py-2 border border-gray-200 rounded hover:border-gray-300"
            >
              Return to Course
            </Link>
            <button
              onClick={() => {
                setShowResults(false);
                setSelectedAnswers({});
                setCurrentQuestion(0);
              }}
              className="px-6 py-2 bg-black text-white rounded hover:bg-gray-900"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentPage;
