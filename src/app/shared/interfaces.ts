export interface User {
    username: string;
    // email: string
    password: string;
    returnSecureToken?: boolean;
}

export interface AuthResponse {
    // idToken?: string;
    // expiresIn?: string;
    token: string;
    username: string;
}

export interface Event {
    id?: string;
    title: string;
    date: Date;
    totalEventSum?: string;
    eventUserList?: string[];
    amountOfExpense?: string;
    expenseList?: string[];

    // private List<String> eventUserLIst;
    // private List<ExpenseDto> expenseList;
}

export interface FbCreateResponse {
    name: string;
}

export interface Token {
    sub: string;
    roles: string[];
    exp: string;
    iat: string;
}
