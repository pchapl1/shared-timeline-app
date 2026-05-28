export type AuthTokens = {
    access: string;
    refresh: string;
};

export type LoginData = {
    username: string;
    password: string;
};

export type RegisterData = {
    username: string;
    email: string;
    password: string;
    // confirmPassword: string;
};