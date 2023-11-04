export type Post = {
  id: number;
  title: string;
  publicationDate: Date;
  content: string;
  author: Author;
};

export type Author = {
  id: number;
  authorName: string;
};
