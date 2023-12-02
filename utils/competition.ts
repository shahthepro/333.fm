import type { User } from './user'

export interface Competition {
  id: number
  alias: string
  type: CompetitionType
  name: string
  startTime: string
  endTime: string
  format: CompetitionFormat
  scrambles: Scramble[]
  status: CompetitionStatus
}

export interface PastCompetition extends Competition {
  winner: Result
}
export interface Result {
  id: number
  rank: number
  values: number[]
  best: number
  average: number
  user: User
  mode: CompetitionMode
  rollingStart: number
}

export interface Scramble {
  id: number
  number: number
  scramble: string
}

export interface Submission {
  id: number
  solution: string
  comment: string
  moves: number
  scramble: Scramble
  user: User
  mode: CompetitionMode
}

export enum CompetitionType {
  WEEKLY,
  RANDOM,
}

export enum CompetitionFormat {
  MO3,
  BO1,
  BO2,
}

export enum CompetitionStatus {
  NOT_STARTED,
  ON_GOING,
  ENDED,
}

export enum CompetitionMode {
  REGULAR,
  UNLIMITED,
}

export interface Endless extends Competition {
  levels: Level[]
}

export interface EndlessStats {
  singles: Result[]
  means: Result[]
  rollingMo3: Result[]
  rollingAo5: Result[]
  rollingAo12: Result[]
}

export interface Level {
  level: number
  competitors: number
  bestSubmissions: Submission[]
  kickedOffs: Kickoff[]
}

export interface UserProgress {
  current: Progress | null
  next: Progress
}

export interface Progress {
  level: number
  scramble: Scramble
  submission?: Submission
  kickedBy?: Kickoff[]
}

export interface Kickoff {
  id: number
  user: User
  submission: Submission
}

export const SYMBOL_ENDLESS = Symbol('endless')
export const SYMBOL_ENDLESS_PROGRESS = Symbol('endless.progress')
export const SYMBOL_ENDLESS_UPDATE_PROGRESS = Symbol('endless.progress.update')

export const DNF = 99999998
export const DNS = 99999999

export function formatResult(result: number, precision = 0) {
  if (result === DNF)
    return 'DNF'
  if (result === DNS)
    return 'DNS'
  return (result / 100).toFixed(precision)
}
