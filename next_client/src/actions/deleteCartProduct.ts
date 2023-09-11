import { API_URL } from "../constants";

export default async function (id: string) {
    const respone = await fetch(`${API_URL}/cart-products/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart_product_id: id }),
        credentials: "include",
    });

    const data = await respone.json();
    return data
}   