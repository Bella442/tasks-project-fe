export interface Message {
  id?: number | undefined;
  sentBy: string;
  userName: string;
  text: string;
  createdAt: string;
}

export interface ChatUser {
  email?: string;
  firstName: string;
  id: string;
  lastName?: string;
}

export interface Chat {
  id: number;
  roomId: string;
  initiatorUser: ChatUser;
  participantUser: ChatUser;
}
