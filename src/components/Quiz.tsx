
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Check, AlertCircle } from 'lucide-react';
import { Quiz as QuizType, saveQuizAttempt, awardBadgeToUser, issueCertificate } from '@/utils/database';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface QuizProps {
  quiz: QuizType;
  courseId: string;
  onComplete?: (score: number, passed: boolean) => void;
}

const Quiz: React.FC<QuizProps> = ({ quiz, courseId, onComplete }) => {
  const { currentUser } = useAuth();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleChange = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = () => {
    // Calculate score
    let correctAnswers = 0;
    quiz.questions.forEach(question => {
      if (answers[question.id] === question.correctOptionId) {
        correctAnswers++;
      }
    });

    const finalScore = correctAnswers;
    setScore(finalScore);
    setSubmitted(true);

    const passed = finalScore >= quiz.passingScore;
    
    if (currentUser) {
      // Save quiz attempt
      saveQuizAttempt(currentUser.id, quiz.id, finalScore, quiz.questions.length);
      
      // If passed, award badge and possibly certificate
      if (passed) {
        awardBadgeToUser(currentUser.id, {
          title: "Quiz Master",
          description: `Passed the "${quiz.title}" quiz`,
          image: "https://images.unsplash.com/photo-1557053908-4793c484d06f?q=80&w=100"
        });
        
        toast.success('You earned a new badge: Quiz Master!');
        
        // If all quizzes in course are completed, issue certificate
        // This is a simplified check - in a real app you'd check all lessons
        issueCertificate(currentUser.id, courseId);
      }
    }
    
    if (onComplete) {
      onComplete(finalScore, passed);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-biophilic-earth">{quiz.title}</CardTitle>
        <CardDescription>{quiz.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {quiz.questions.map((question, index) => (
            <div key={question.id} className="p-4 border rounded-lg">
              <div className="flex items-start mb-4">
                <span className="flex items-center justify-center text-white bg-biophilic-earth w-6 h-6 rounded-full mr-2">
                  {index + 1}
                </span>
                <h3 className="text-lg font-medium">{question.text}</h3>
              </div>
              
              <RadioGroup 
                value={answers[question.id]} 
                onValueChange={(value) => handleChange(question.id, value)}
                disabled={submitted}
                className="ml-8"
              >
                {question.options.map(option => (
                  <div key={option.id} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem
                      value={option.id}
                      id={`${question.id}-${option.id}`}
                      className={submitted ? (
                        option.id === question.correctOptionId ? "border-green-500 text-green-500" : 
                        answers[question.id] === option.id ? "border-red-500 text-red-500" : ""
                      ) : ""}
                    />
                    <Label 
                      htmlFor={`${question.id}-${option.id}`}
                      className={submitted ? (
                        option.id === question.correctOptionId ? "text-green-600" : 
                        answers[question.id] === option.id && option.id !== question.correctOptionId ? "text-red-600" : ""
                      ) : ""}
                    >
                      {option.text}
                      {submitted && option.id === question.correctOptionId && (
                        <Check className="inline-block ml-2 w-4 h-4 text-green-500" />
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              
              {submitted && answers[question.id] !== question.correctOptionId && (
                <div className="ml-8 mt-2 text-red-500 flex items-center text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" /> 
                  Incorrect answer
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col items-start">
        {submitted ? (
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Your Score: {score}/{quiz.questions.length}</h3>
              <Badge variant={score >= quiz.passingScore ? "default" : "destructive"}>
                {score >= quiz.passingScore ? "Passed" : "Failed"}
              </Badge>
            </div>
            <Button 
              className="w-full bg-biophilic-earth hover:bg-biophilic-earth/90"
              onClick={() => {
                setSubmitted(false);
                setAnswers({});
              }}
            >
              Retry Quiz
            </Button>
          </div>
        ) : (
          <Button 
            className="w-full bg-biophilic-earth hover:bg-biophilic-earth/90" 
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < quiz.questions.length}
          >
            Submit Answers
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Quiz;
