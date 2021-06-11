export interface User {
    username: string;
    // email: string
    password: string;
    returnSecureToken?: boolean;
}

export interface AuthResponse {
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
    description?: string;

}

export interface DirectPayer {
    userName: string;
    sum: string;
}

export interface PartitialPayer {
    userName: string;
    cof: string;
}

export interface Exp {
    id?: string;
    buyer: string;
    comment?: string;
    event: string;
    expenseDate: Date;
    totalExpenseSum?: string;
    numberOfExpenseParticipants?: string;
    directPayerMap?: DirectPayer[];
    partitialPayerMap?: PartitialPayer[];
}

export interface Token {
    sub: string;
    roles: string[];
    exp: string;
    iat: string;
}
