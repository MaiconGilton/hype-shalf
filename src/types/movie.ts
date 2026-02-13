export type Genre = 'horror' | 'action' | 'comedy' | 'drama' | 'sci-fi' | 'thriller'

export interface Movie {
  id: string
  title: string
  genre: Genre
  link: string
  blurb: string
  staffPick: boolean
  user?: {
    id: string
    name?: string
    imageUrl?: string
  }
}
