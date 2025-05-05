
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Play, Pause, Upload, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

interface VoiceRecorderProps {
  onRecordingComplete?: (audioBlob: Blob) => void;
  maxDuration?: number; // in seconds
  showSubmitButton?: boolean;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ 
  onRecordingComplete,
  maxDuration = 180, // default to 3 minutes
  showSubmitButton = true
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);
  
  // Update progress calculation
  const progressPercentage = (recordingTime / maxDuration) * 100;
  
  // Start recording function
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        setAudioBlob(audioBlob);
        
        if (onRecordingComplete && !showSubmitButton) {
          onRecordingComplete(audioBlob);
        }
      };
      
      // Start the timer
      setRecordingTime(0);
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= maxDuration - 1) {
            stopRecording();
            return maxDuration;
          }
          return prev + 1;
        });
      }, 1000);
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Could not access microphone. Please check your permissions.');
    }
  };
  
  // Stop recording function
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      
      // Stop all audio tracks from the stream
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
      
      // Clear the timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      setIsRecording(false);
    }
  };
  
  // Toggle play/pause of recorded audio
  const togglePlayback = () => {
    if (!audioPlayerRef.current) return;
    
    if (isPlaying) {
      audioPlayerRef.current.pause();
    } else {
      audioPlayerRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Submit the recording
  const submitRecording = () => {
    if (audioBlob && onRecordingComplete) {
      onRecordingComplete(audioBlob);
      setIsSubmitted(true);
      toast.success('Recording submitted successfully!');
    }
  };
  
  // Handle audio player events
  const handleAudioEnded = () => {
    setIsPlaying(false);
  };
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Cleanup function
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);
  
  return (
    <div className="rounded-lg border p-4 bg-white">
      <div className="text-center mb-4">
        <h3 className="text-biophilic-earth font-medium">Voice Recorder</h3>
        <p className="text-sm text-muted-foreground">
          {isRecording 
            ? `Recording: ${formatTime(recordingTime)} / ${formatTime(maxDuration)}`
            : audioURL 
              ? 'Recording complete! Play it back or re-record.'
              : 'Click to start recording your voice note.'
          }
        </p>
      </div>
      
      {isRecording && (
        <div className="mb-4">
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>{formatTime(recordingTime)}</span>
            <span>{formatTime(maxDuration)}</span>
          </div>
        </div>
      )}
      
      <div className="flex justify-center space-x-4">
        {isRecording ? (
          <Button 
            variant="destructive"
            size="lg"
            className="rounded-full w-12 h-12 flex items-center justify-center"
            onClick={stopRecording}
          >
            <MicOff size={20} />
          </Button>
        ) : (
          <Button 
            className="bg-biophilic-earth hover:bg-biophilic-earth/90 rounded-full w-12 h-12 flex items-center justify-center"
            onClick={startRecording}
            disabled={!!audioURL && isPlaying || isSubmitted}
          >
            <Mic size={20} />
          </Button>
        )}
        
        {audioURL && (
          <>
            <Button 
              variant="outline" 
              className="rounded-full w-12 h-12 flex items-center justify-center"
              onClick={togglePlayback}
              disabled={isSubmitted}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </Button>
            
            <audio 
              ref={audioPlayerRef}
              src={audioURL}
              onEnded={handleAudioEnded}
              style={{ display: 'none' }}
            />
          </>
        )}
        
        {audioURL && showSubmitButton && !isSubmitted && (
          <Button 
            variant="outline" 
            className="rounded-full w-12 h-12 flex items-center justify-center bg-green-50 border-green-200 hover:bg-green-100"
            onClick={submitRecording}
          >
            <Upload size={20} className="text-green-600" />
          </Button>
        )}
        
        {isSubmitted && (
          <div className="rounded-full w-12 h-12 flex items-center justify-center bg-green-100">
            <Check size={20} className="text-green-600" />
          </div>
        )}
      </div>
      
      {audioURL && !isSubmitted && (
        <div className="mt-4 text-center">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              setAudioURL(null);
              setAudioBlob(null);
              setIsPlaying(false);
            }}
            disabled={isSubmitted}
          >
            Record Again
          </Button>
        </div>
      )}
      
      {isSubmitted && (
        <p className="text-center text-sm text-green-600 mt-4">
          Your recording has been submitted successfully!
        </p>
      )}
    </div>
  );
};

export default VoiceRecorder;
