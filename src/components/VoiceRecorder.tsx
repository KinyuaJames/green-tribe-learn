
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Play, Pause } from 'lucide-react';
import { toast } from 'sonner';

interface VoiceRecorderProps {
  onRecordingComplete?: (audioBlob: Blob) => void;
  maxDuration?: number; // in seconds
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ 
  onRecordingComplete,
  maxDuration = 180 // default to 3 minutes
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);
  
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
        
        if (onRecordingComplete) {
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
            disabled={!!audioURL && isPlaying}
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
      </div>
      
      {audioURL && (
        <div className="mt-4 text-center">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              setAudioURL(null);
              setIsPlaying(false);
            }}
          >
            Record Again
          </Button>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
