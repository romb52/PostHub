export interface IUser{
    username: string;
    email:string;
    id:number;
    image:string;
    token:string;
}

export interface IFullUser{
    user: IUser;
  }