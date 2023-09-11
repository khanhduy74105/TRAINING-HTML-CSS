import { API_URL } from "../constants";

export default async function () {
    const respone = fetch(`${API_URL}/users/logout`, {
        method: "POST",
        credentials: "include",
    })

    return respone
}