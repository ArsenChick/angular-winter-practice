import { InitEllipseProps, InitLineProps, InitRectangleProps } from "../constants/shape-consts"

interface Shape<T> {
  readonly type: string
  properties: T
}

export class Ellipse implements Shape<EllipseProps> {
  type = "ellipse"
  properties: EllipseProps

  constructor(props = InitEllipseProps) {
    this.properties = props
  }
}

export class Line implements Shape<LineProps> {
  type = "line"
  properties: LineProps

  constructor(props = InitLineProps) {
    this.properties = props
  }
}

export class Rectangle implements Shape<RectangleProps> {
  type = "rectangle"
  properties: RectangleProps

  constructor(props = InitRectangleProps) {
    this.properties = props
  }
}

interface BaseProps {
  strokeColor: string
  strokeWidth: number
  fill?: string
}

export interface EllipseProps extends BaseProps {
  x: number
  y: number
  rx: number
  ry: number
}

export interface LineProps extends BaseProps {
  start: {
    x: number
    y: number
  }
  end: {
    x: number
    y: number
  }
}

export interface RectangleProps extends BaseProps {
  x: number
  y: number
  height: number
  width: number
}
