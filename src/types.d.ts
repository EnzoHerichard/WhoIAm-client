import { Gender } from './types/gender'

export type Celebrity = {
  name: string
  age: string
  gender: Gender
  occupation: string
  nationality: string
  image: string
}

export type Try = {
  name: string
}

export type Hint = {
  correct: boolean
  age: boolean
  gender: boolean
  occupation: boolean
  nationality: boolean
}
