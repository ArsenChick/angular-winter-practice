import { IShape } from './shapes.interface'

export interface IDiagram {
  id: string
  title: string
  components: IShape[]
}

export interface IIdShape {
  id: number | null
  shape: IShape
}

export interface IDrawableDiagram {
  id: string
  title: string
  components: IIdShape[]
}
