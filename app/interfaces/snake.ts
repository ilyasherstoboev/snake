export type IMove = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | ''

export type IPoint = {
  x: number,
  y: number,
}

export interface IPosition extends IPoint {
  id: string
}

export interface ICoordinate {
  x: number
  y: number
}

export interface ISnake extends ICoordinate {
  id: string
}

export interface IDirection {
  UP: 'y'
  DOWN: 'y'
  LEFT: 'x'
  RIGHT: 'x'
}

export interface IFirstRow {
  [key: string]: {
    condition: () => boolean
    action: () => void
  }
}

export type TArrowEvent = 'ArrowUp' | 'ArrowLeft' | 'ArrowDown' | 'ArrowRight'
