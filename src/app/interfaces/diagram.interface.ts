import { Ellipse, Line, Rectangle } from './shapes.interface'

export interface Diagram {
  id: string
  title: string
  components: (Ellipse | Line | Rectangle)[]
}
