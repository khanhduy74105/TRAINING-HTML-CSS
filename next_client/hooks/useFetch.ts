import { API_URL } from "@/constants";

export default async function(route: string, method: string, body?: any){
    const respone = await fetch(`${API_URL}/${route}`,{
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
    })

    const data = await respone.json()
    return data
}