import { Dispatch, SetStateAction } from "react";
import User from "./User";
import { Page } from "./Page";

export default interface Prop{
    page : Page;
    user : User;
    isLogin: boolean;

    setPage : Dispatch<SetStateAction<Page>>;
    setUser : Dispatch<SetStateAction<User>>;
    setLogin : Dispatch<SetStateAction<boolean>>;
}