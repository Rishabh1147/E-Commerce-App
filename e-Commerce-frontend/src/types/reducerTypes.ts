import { User } from "./types";


export interface UserReducerIninitialState {
    user: User | null;
    loading: boolean;
}