export interface Message {
  userId: string | null;
  userName: string;
  text: string;
  createdAt: Date;
}

export interface ChatUser {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
}

export interface Chat {
  id: number;
  roomId: string;
  initiatorUser: ChatUser;
  participantUser: ChatUser;
}
