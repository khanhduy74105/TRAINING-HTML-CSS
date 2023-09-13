import { API_URL } from "../constants";

export default async function () {
    const respone = await fetch(`${API_URL}/users/logout`, {
        method: "POST",
        credentials: "include",
    })

    return await respone.json()
}