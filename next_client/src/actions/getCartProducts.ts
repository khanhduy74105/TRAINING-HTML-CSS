import { API_URL } from "../constants";
import { ICartProduct } from "../types";

export default async function (currentCartItems: ICartProduct[]) {
    const respone = await fetch(`${API_URL}/cart-products/my`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    const data = await respone.json()

    const promisesItem = data.data.map((cartItem: any) => {
        if (
            currentCartItems.find((item: any) => item.item._id === cartItem.product_id)
        ) {
            return null;
        } else {
            return new Promise((resolve, reject) => {
                fetch(`${API_URL}/products/${cartItem.product_id}`)
                    .then((res) => res.json())
                    .then((data) => {
                        resolve({
                            item: data.data,
                            amount: cartItem.quantity,
                            _id: cartItem._id,
                        });
                    });
            });
        }
    });
    return Promise.all(promisesItem.filter((item: any) => item !== null));
}