import { z } from 'zod';

// Input validation schemas
export const emailSchema = z.string().email('Invalid email format');
export const nameSchema = z.string().min(1, 'Name is required').max(100, 'Name too long');
export const messageSchema = z.string().min(1, 'Message is required').max(5000, 'Message too long');

// Input sanitization functions
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') {
    return '';
  }
  
  // Remove potentially dangerous characters and normalize whitespace
  return input
    .replace(/[<>'"&]/g, '') // Remove HTML/script injection characters
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
};

export const sanitizeEmail = (email: string): string => {
  if (typeof email !== 'string') {
    return '';
  }
  
  // Basic email sanitization - remove dangerous characters but keep email valid
  return email
    .toLowerCase()
    .replace(/[<>'"&]/g, '')
    .trim();
};

// URL validation for external links
export const isValidExternalUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
};

// Safe HTML content checker
export const containsUnsafeContent = (content: string): boolean => {
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+=/i, // onclick, onload, etc.
    /<iframe/i,
    /<object/i,
    /<embed/i,
  ];
  
  return dangerousPatterns.some(pattern => pattern.test(content));
};

// Rate limiting helper (for future use)
export const createRateLimiter = (maxRequests: number, windowMs: number) => {
  const requests: number[] = [];
  
  return () => {
    const now = Date.now();
    // Remove old requests outside the window
    while (requests.length > 0 && requests[0] <= now - windowMs) {
      requests.shift();
    }
    
    if (requests.length >= maxRequests) {
      return false; // Rate limit exceeded
    }
    
    requests.push(now);
    return true; // Request allowed
  };
};
