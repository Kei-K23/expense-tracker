export type UserSignUp = {
    username: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

export type UserSignIn = {
    phone: string;
    password: string;
}