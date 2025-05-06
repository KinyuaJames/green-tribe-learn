
import { discussionThreads, generateId } from './mock-data';
import { DiscussionThread, ThreadInput, MessageInput } from './types';

// Discussion Functions
export const getCourseDiscussions = (courseId: string) => {
  return discussionThreads.filter(thread => thread.courseId === courseId);
};

export const createDiscussionThread = (input: ThreadInput) => {
  const threadId = generateId();
  const timestamp = new Date().toISOString();
  
  const newThread: DiscussionThread = {
    id: threadId,
    courseId: input.courseId,
    studentId: input.studentId,
    studentName: input.studentName,
    title: input.title,
    status: 'open',
    createdAt: timestamp,
    lastMessageAt: timestamp,
    messages: [
      {
        id: generateId(),
        threadId: threadId,
        userId: input.studentId,
        userName: input.studentName,
        userRole: 'student',
        content: input.message,
        createdAt: timestamp
      }
    ]
  };
  
  discussionThreads.push(newThread);
  return threadId;
};

export const addDiscussionMessage = (input: MessageInput) => {
  const thread = discussionThreads.find(t => t.id === input.threadId);
  if (!thread) return false;
  
  const timestamp = new Date().toISOString();
  
  const message = {
    id: generateId(),
    threadId: input.threadId,
    userId: input.userId,
    userName: input.userName,
    userRole: input.userRole,
    content: input.content,
    createdAt: timestamp
  };
  
  thread.messages.push(message);
  thread.lastMessageAt = timestamp;
  
  return message.id;
};
