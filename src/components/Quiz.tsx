
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Quiz as QuizType, QuizQuestion } from '@/utils/database/types';
import { saveQuizAttempt } from '@/utils/database';
import { useAuth } from '@/contexts/AuthContext';

interface QuizProps {
  quiz: QuizType;
  onComplete?: (score: number, passed: boolean) => void;
}

const Quiz = ({ quiz, onComplete }: QuizProps) => {
  const { currentUser } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(
    quiz.timeLimit ? quiz.timeLimit * 60 : null
  );
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  const handleAnswerSelect = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      submitQuiz();
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const submitQuiz = () => {
    setShowResults(true);
    
    // Calculate score
    let correctCount = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quiz.questions[index].correctAnswerIndex) {
        correctCount++;
      }
    });
    
    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;
    
    // Save attempt if user is logged in
    if (currentUser) {
      saveQuizAttempt(
        currentUser.id,
        quiz.id,
        score,
        selectedAnswers,
        quiz.questions.length,
        passed
      );
    }
    
    // Trigger onComplete callback if provided
    if (onComplete) {
      onComplete(score, passed);
    }
  };
  
  // Timer effect
  useEffect(() => {
    if (timeRemaining !== null && !showResults) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev && prev > 0) {
            return prev - 1;
          } else {
            clearInterval(timer);
            submitQuiz();
            return 0;
          }
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [timeRemaining, showResults]);
  
  // Format time remaining
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  // Results screen
  if (showResults) {
    const correctAnswers = selectedAnswers.filter(
      (answer, index) => answer === quiz.questions[index].correctAnswerIndex
    ).length;
    
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;
    
    return (
      <div className="space-y-6 p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">{passed ? 'Congratulations!' : 'Quiz Results'}</h2>
          <div className="mt-4 flex justify-center">
            {passed ? (
              <CheckCircle className="h-16 w-16 text-green-500" />
            ) : (
              <XCircle className="h-16 w-16 text-red-500" />
            )}
          </div>
          <p className="mt-4 text-lg">
            You scored <span className="font-bold">{score}%</span>
          </p>
          <p>
            {correctAnswers} out of {quiz.questions.length} correct
          </p>
          {!passed && (
            <p className="mt-2 text-muted-foreground">
              You need {quiz.passingScore}% to pass this quiz
            </p>
          )}
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium">Review your answers:</h3>
          {quiz.questions.map((question, index) => {
            const isCorrect = selectedAnswers[index] === question.correctAnswerIndex;
            
            return (
              <Card key={index} className={cn("p-4", isCorrect ? "border-green-200" : "border-red-200")}>
                <div className="flex items-start gap-2">
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium">{question.question}</p>
                    <p className="text-sm mt-1">
                      <span className="font-medium">Your answer: </span>
                      {selectedAnswers[index] !== undefined ? question.options[selectedAnswers[index]].text : 'No answer'}
                    </p>
                    {!isCorrect && (
                      <p className="text-sm mt-1 text-green-600">
                        <span className="font-medium">Correct answer: </span>
                        {question.options[question.correctAnswerIndex].text}
                      </p>
                    )}
                    {question.explanation && (
                      <p className="text-sm mt-2 text-muted-foreground">{question.explanation}</p>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 p-4">
      {/* Quiz header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Question {currentQuestionIndex + 1} of {quiz.questions.length}</h3>
        {timeRemaining !== null && (
          <div className="text-sm font-medium">
            Time remaining: {formatTime(timeRemaining)}
          </div>
        )}
      </div>
      
      {/* Progress bar */}
      <Progress
        value={((currentQuestionIndex + 1) / quiz.questions.length) * 100}
        className="h-2"
      />
      
      {/* Current question */}
      <div className="mt-6">
        <p className="font-medium text-lg">{currentQuestion.question}</p>
        
        <RadioGroup
          className="mt-4 space-y-3"
          value={selectedAnswers[currentQuestionIndex]?.toString()}
          onValueChange={(value) => handleAnswerSelect(parseInt(value))}
        >
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/30"
            >
              <RadioGroupItem value={index.toString()} id={`answer-${index}`} />
              <Label htmlFor={`answer-${index}`} className="flex-grow cursor-pointer">
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between pt-4">
        <Button
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
          variant="outline"
        >
          Previous
        </Button>
        
        <Button
          onClick={handleNextQuestion}
          disabled={selectedAnswers[currentQuestionIndex] === undefined}
        >
          {currentQuestionIndex === quiz.questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
