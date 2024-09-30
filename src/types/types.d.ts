export type CurrentIntersectingPage =
  | "home"
  | "gallery"
  | "about"
  | "book"
  | "contact";

export type DataType = {
  id: number;
  name: string;
  displayName: string | null;
  email: string;
  message: string;
  createdAt: Date;
  ableToShow: boolean;
};
