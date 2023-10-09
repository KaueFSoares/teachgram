export interface OwnPostsResponse {
  totalPages: number
  totalElements: number
  content: Content[]
  number: number
  pageable: Pageable
  first: boolean
  last: boolean
  numberOfElements: number
  empty: boolean
}

interface Pageable {
  pageSize: number
  pageNumber: number
}

interface Content {
  id: string
  photoLink: string
}
