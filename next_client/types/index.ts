export type IUser = {
    username: string,
}

export type IProduct = {
    _id: string,
    name: string,
    price: number,
    images: string[],
    createdAt: Date,
    updatedAt: Date
}

export type ICartProduct = {
    _id: string,
    amount: number,
    item: IProduct
}

export type ReduxAction = {
    type: string,
    payload: any
}

