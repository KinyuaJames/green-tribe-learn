
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { saveQuizAttempt, Quiz as QuizType } from '@/utils/database';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Timer } from 'lucide-react';

interface QuizProps {
  quiz: QuizType;
  courseId: string;
  onComplete: (score: number, passed: boolean) => void;
}

const Quiz: React.FC<QuizProps> = ({ quiz, courseId, onComplete }) => {
  const { currentUser } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit || 300); // Default to 5 minutes if not specified
  const [timerActive, setTimerActive] = useState(true);
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  
  // Timer effect
  useEffect(() => {
    if (!timerActive) return;
    
    if (timeRemaining <= 0) {
      // Time's up, auto-submit the quiz
      handleSubmitQuiz();
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeRemaining, timerActive]);
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  const handleOptionSelect = (questionId: string, optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    setTimerActive(false);
    
    try {
      // Calculate score
      let score = 0;
      quiz.questions.forEach(question => {
        if (selectedOptions[question.id] === question.correctOptionId) {
          score++;
        }
      });
      
      const passed = score >= quiz.passingScore;
      
      // Save the attempt if user is logged in
      if (currentUser) {
        saveQuizAttempt(currentUser.id, quiz.id, score, totalQuestions);
      }
      
      setQuizCompleted(true);
      
      // Call the completion handler
      onComplete(score, passed);
      
      // Show appropriate message
      if (passed) {
        toast.success(`Congratulations! You scored ${score}/${totalQuestions}`);
      } else {
        toast.error(`You scored ${score}/${totalQuestions}. The passing score is ${quiz.passingScore}/${totalQuestions}`);
      }
    } catch (error) {
      toast.error('There was an error submitting your quiz');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  if (quizCompleted) {
    return (
      <Card className="p-6 text-center">
        <h3 className="text-xl font-bold mb-4">Quiz Completed</h3>
        <p className="mb-4">
          Thank you for completing the quiz. Your results have been recorded.
        </p>
        <Button onClick={() => window.location.reload()}>Continue Learning</Button>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">{quiz.title}</h3>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Timer className="h-4 w-4" />
          <span>{formatTime(timeRemaining)}</span>
        </div>
      </div>
      
      {quiz.description && (
        <p className="text-muted-foreground">{quiz.description}</p>
      )}
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </span>
        <span className="text-sm text-muted-foreground">
          Passing score: {quiz.passingScore}/{totalQuestions}
        </span>
      </div>
      
      <Progress value={progress} className="h-2" />
      
      <Card className="p-6">
        <div className="space-y-6">
          <h4 className="text-lg font-medium">{currentQuestion.text}</h4>
          
          <RadioGroup
            value={selectedOptions[currentQuestion.id] || ''}
            onValueChange={(value) => handleOptionSelect(currentQuestion.id, value)}
          >
            <div className="space-y-4">
              {currentQuestion.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.id}
                    id={`option-${option.id}`}
                  />
                  <Label htmlFor={`option-${option.id}`}>{option.text}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      </Card>
      
      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        
        {currentQuestionIndex < totalQuestions - 1 ? (
          <Button
            onClick={handleNextQuestion}
            disabled={!selectedOptions[currentQuestion.id]}
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={handleSubmitQuiz}
            disabled={!selectedOptions[currentQuestion.id] || isSubmitting}
            className="bg-biophilic-earth hover:bg-biophilic-earth/90"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
