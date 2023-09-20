import { ICartProduct, IUser } from "@/types";

export function setUser(data: IUser | null) {
    return {
        type: 'user/set',
        payload: data
    }
}

export function addCartProduct(data: ICartProduct){
    return {
        type: 'cartProducts/add',
        payload: data
    }
}

export function updateCartProductAction(_id: string, quantity: number){
    console.log({_id, quantity})
    return {
        type: 'cartProducts/update',
        payload: {_id, quantity}
    }
}
export function removeCartProductAction(_id: string){
    return {
        type: 'cartProducts/remove',
        payload: _id
    }
}

export function setCartPropducts(data: ICartProduct[]){
    return {
        type: 'cartProducts/set',
        payload: data
    }
} 