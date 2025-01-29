export interface Message {
  userId: number | null;
  userName: string;
  text: string;
  createdAt: string;
}

export interface ChatUser {
  userId: number;
  userName: string;
}
