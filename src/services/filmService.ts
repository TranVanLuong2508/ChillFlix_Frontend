import axios from "@/lib/axios"

const baseURL = process.env.NEXT_PUBLIC_API_BACKEND_URL
export const filmService = {
    async getAll() {
        return axios.get(`${baseURL}/films?current=1&pageSize=10`)
    },
    async getById(id: string) {
        return axios.get(`${baseURL}/films/${id}`)
    },
    async getHeroSlides() {
        return axios.get(`${baseURL}/films?current=1&pageSize=5`)
    },
}
