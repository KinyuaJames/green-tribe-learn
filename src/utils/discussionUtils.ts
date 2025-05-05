
import { getUserById } from './database';

export interface DiscussionPost {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorImage?: string;
  timestamp: string;
  likes: number;
  replies: DiscussionReply[];
}

export interface DiscussionReply {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorImage?: string;
  timestamp: string;
}

// Get all discussion posts
export const getDiscussionPosts = (): DiscussionPost[] => {
  return JSON.parse(localStorage.getItem('discussionPosts') || '[]');
};

// Create a new post
export const createDiscussionPost = (
  userId: string,
  content: string
): DiscussionPost => {
  const posts = getDiscussionPosts();
  const user = getUserById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  const newPost: DiscussionPost = {
    id: crypto.randomUUID(),
    content,
    authorId: user.id,
    authorName: user.fullName,
    timestamp: new Date().toISOString(),
    likes: 0,
    replies: []
  };
  
  posts.push(newPost);
  localStorage.setItem('discussionPosts', JSON.stringify(posts));
  
  return newPost;
};

// Add a reply to a post
export const addReplyToPost = (
  postId: string,
  userId: string,
  content: string
): DiscussionReply | null => {
  const posts = getDiscussionPosts();
  const user = getUserById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  const postIndex = posts.findIndex(post => post.id === postId);
  
  if (postIndex === -1) {
    return null;
  }
  
  const newReply: DiscussionReply = {
    id: crypto.randomUUID(),
    content,
    authorId: user.id,
    authorName: user.fullName,
    timestamp: new Date().toISOString()
  };
  
  posts[postIndex].replies.push(newReply);
  localStorage.setItem('discussionPosts', JSON.stringify(posts));
  
  return newReply;
};

// Like a post
export const likePost = (postId: string): boolean => {
  const posts = getDiscussionPosts();
  const postIndex = posts.findIndex(post => post.id === postId);
  
  if (postIndex === -1) {
    return false;
  }
  
  posts[postIndex].likes += 1;
  localStorage.setItem('discussionPosts', JSON.stringify(posts));
  
  return true;
};
