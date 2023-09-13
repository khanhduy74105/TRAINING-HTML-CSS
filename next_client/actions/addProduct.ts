import { API_URL } from "../constants";

export default async function (product_id: string) {
    const respone = await fetch(`${API_URL}/cart-products/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            product_id: product_id
        }),
        credentials: "include",
    })

    const data = await respone.json()
    return data
}