import { Customer } from "./customer.model";

export interface Budget {
    _id?: string,
    code?: string,
    customer: Customer,
    date: any,
    validUntil: any,
    items: Array<{
        article: string,
        quantity: number | null,
        price: number | null,
        amount: number | null
    }>,
    total?: number,
    idSalesUser: string
}