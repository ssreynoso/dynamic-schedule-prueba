export type NavBarOption = { label: string; path: string }

export type Prettify<T> = {
    [K in keyof T]: T[K]
}

export type CSSStyle = { [key: string]: string }

export interface IError extends Error {
    name: string
    message: string
}

export type Response<T> = { data: T; error: null } | { data: null; error: IError }
