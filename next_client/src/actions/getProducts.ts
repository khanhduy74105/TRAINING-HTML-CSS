import { API_URL } from "../constants";

export default async function () {
    try {
        const products = await fetch(`${API_URL}/products`)
        return products.json()
    } catch (error) {
        return null
    }
}