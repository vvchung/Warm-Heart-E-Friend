export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
  SYSTEM = 'system' // For internal UI messages
}

export interface Message {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export enum AppView {
  CHAT = 'chat',
  RESOURCES = 'resources',
  BREATHING = 'breathing'
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
}
