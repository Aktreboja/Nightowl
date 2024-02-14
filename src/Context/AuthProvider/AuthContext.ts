import { Dispatch, SetStateAction, createContext } from "react"

export interface AuthContextType {
    auth: boolean;
    setAuth: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>({
    auth: false,
    setAuth: () => {}
});