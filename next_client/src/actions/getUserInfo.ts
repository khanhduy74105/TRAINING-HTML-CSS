import { API_URL } from "../constants";

export default async function () {
    const response = await fetch(`${API_URL}/users/me`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    return data
}