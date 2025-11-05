export interface IRegisterList {
    title: "email" | "password" | "username",
    type: string,
    id: string
}
export interface ILoginList {
    title: "identifier" | "password",
    type: string,
    id: string
}
export const loginList: ILoginList[] = [
    {
        title: "identifier",
        type: "identifier",
        id: "identifier"
    },
    {
        title: "password",
        type: "password",
        id: "password"
    }

]
export const registerList: IRegisterList[] = [
    {
        title: "username",
        type: "username",
        id: "username"
    },
    {
        title: "email",
        type: "email",
        id: "email"
    },
    {
        title: "password",
        type: "password",
        id: "password"
    },



]