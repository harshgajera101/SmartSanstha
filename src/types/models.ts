export type Role = 'student' | 'teacher' | 'admin'

export interface User {
  _id?: string
  name: string
  email: string
  role: Role
  avatarUrl?: string
  createdAt?: string
}

export interface Course {
  _id?: string
  title: string
  description: string
  progress?: number
  lessons?: number
  tags?: string[]
}

export interface CaseFile {
  _id?: string
  title: string
  summary: string
  difficulty: 'easy' | 'medium' | 'hard'
  points?: number
}

export interface Game {
  _id?: string
  title: string
  subtitle?: string
  difficulty: 'easy' | 'medium' | 'hard'
  estMinutes?: number
}
