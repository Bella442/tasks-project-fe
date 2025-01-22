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
