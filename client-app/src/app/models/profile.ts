import { User } from "./user";

export interface IProfile {
    displayName: string;
    username: string;
    image?: string;
    bio?: string;
    followersCount: number;
    followingCount: number;
    following: boolean;
    photos?: Photo[];
}

export class Profile implements IProfile {
    constructor (user: User) {
        this.username = user.username;
        this.displayName = user.displayName;
        this.image = user.image;
    }

    displayName: string;
    username: string;
    image?: string;
    bio?: string;
    photos?: Photo[];

    followersCount: number = 0;
    followingCount: number = 0;
    following: boolean = false;
    
}

export interface Photo{
    id: string;
    url: string;
    isMain: boolean;
}