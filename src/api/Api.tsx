import { SendResponse } from "../models/send"
import { Tag } from "../models/tag"

export const Api = {
    async request(endpoint: string, method: string = "GET", data?: object): Promise<object> {
        return fetch(import.meta.env.VITE_API_URL + endpoint, {
            method: method,
            body: data && JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async res => {
            if (!res.ok) throw {
                res: res,
                error: new Error()
            }
            return await res.json()
        })
    },

    async getTags(): Promise<Tag[]> {
        return this.request("/tags", "GET") as Promise<Tag[]>
    },

    async searchName(name: string): Promise<string[]> {
        return this.request("/search/name?name=" + name, "GET") as Promise<string[]>
    },

    async searchEmail(email: string): Promise<string[]> {
        return this.request("/search/email?email=" + email, "GET") as Promise<string[]>
    },

    async send(name: string, email: string, text: string, images: string[], tg_data: string): Promise<SendResponse> {
        return this.request("/send", "POST", {name, email, text, images, tg_data}) as Promise<SendResponse>
    }
}