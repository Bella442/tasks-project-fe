export interface Message {
  userId: number | null;
  userName: string;
  text: string;
  createdAt: string;
}

export interface ChatUser {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
}

export interface Chat {
  id: number;
  roomId: string;
  initiatorId: number;
  participantId: number;
  initiatorUser: ChatUser;
  participantUser: ChatUser;
}
