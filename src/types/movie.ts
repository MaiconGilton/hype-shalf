export type Genre = 'Horror' | 'Action' | 'Comedy' | 'Drama' | 'Sci-Fi' | 'Thriller'

export interface Movie {
  id: number
  title: string
  genre: Genre
  link: string
  blurb: string
}
