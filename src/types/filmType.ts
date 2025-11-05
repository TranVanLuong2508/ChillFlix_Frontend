export interface Film {
    filmId: string
    title: string
    originalTitle?: string
    description?: string
    posterUrl: string
    year?: number
    age?: string
    language?: string
    genres?: Array<{ valueVi?: string; valueEn?: string; keyMap?: string } | string>
    progress?: number
    rating?: number
    badges?: Array<{ text: string; color: string }>
    imdbRating?: number
    ageRating?: string
    episodes?: string
}
