import { Dispatch, SetStateAction } from "react";


export type Word = {
    danish: string;
    english: string;
    audio: string;
    audioSlow: string;
}

export type Book = {
    name: string;
    words: Word[];
}
export type SafeData = {
    username: string;
    token: string;
    books: Book[]
};
export type UserData = SafeData | undefined | null;

export type Safe = [SafeData, Dispatch<SetStateAction<SafeData>>]
export type User = [UserData, Dispatch<SetStateAction<UserData>>]

type RequestResponseSuccess<T> = {
    success: true;
    data: T;
    status?: number;
};
type RequestResponseFailure = {
    success: false;
    data: string;
    status?: number;
};
export type RequestResponse<T> = RequestResponseSuccess<T> | RequestResponseFailure;
