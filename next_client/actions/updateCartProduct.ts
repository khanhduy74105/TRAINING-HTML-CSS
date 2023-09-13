import { API_URL } from "../constants";

export default async function (_id: string, amount: number) {
    const respone = await fetch(`${API_URL}/cart-products`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cart_product_id: _id,
            quantity: amount,
        }),
        credentials: "include",
    });

    const data = await respone.json();

    return data
}