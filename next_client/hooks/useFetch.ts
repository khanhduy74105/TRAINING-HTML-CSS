import { API_URL } from "@/constants";

export default async function(route: string, method: string, body?: any){
    let options = {}
    if (method === 'GET') {
        options = {
        method: method,
        credentials: "include",
        }
    }

    if (method !== 'GET') {
        options={
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            credentials: "include",
        }
    }
    const respone = await fetch(`${API_URL}/${route}`, options)

    const data = await respone.json()
    return data
}