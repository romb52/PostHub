export interface IPost {
  id: number;
  title: string;
  body: string;  
  tagList: string[];
  description: string;
  slug: string;
  author: IAuthor;
}

export interface IPosts {
  articles: IPost[];
  articlesCount: number;  
}

export interface IAuthor{
  id: number;
  email: string;
  username: string;
}

export interface IPostResponce {
  article:{
    title: string;
    description: string;
    body: string;
    tagList: string[];
    slug: string;
    author: IAuthor & {bio: string; image: string};    
  };
  id: number;
  createdAt: string;
  updatedAt: string;
  favoritesCount: number;
}