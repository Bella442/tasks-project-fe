// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NEED_TO_BE_ANY = any;

export interface UniversityData {
  name: string;
  web_pages: Array<string>;
  country: string;
}

export interface Country {
  name: string;
  flag: string;
}
export interface TasksData {
  id: number;
  userId: number;
  taskName: string;
  startDate: Date;
  endDate?: Date;
  taskStatus: string;
  user?: User;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  role: string;
  managerId?: number;
  isActive?: boolean;
}
