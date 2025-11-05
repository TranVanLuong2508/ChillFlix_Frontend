import publicAxios from "@/lib/publicAxios"

const baseURL = process.env.NEXT_PUBLIC_API_BACKEND_URL
export const filmService = {
    async getAll() {
        return publicAxios.get(`${baseURL}/films?current=1&pageSize=10`)
    },
    async getById(id: string) {
        return publicAxios.get(`${baseURL}/films/${id}`)
    },
    async getHeroSlides() {
        return publicAxios.get(`${baseURL}/films?current=1&pageSize=5`)
    },
}
