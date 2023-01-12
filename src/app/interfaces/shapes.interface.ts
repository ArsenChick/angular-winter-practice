import { InitEllipseProps, InitLineProps, InitReactangleProps } from "../constants/shape-consts"

interface Shape<T> {
  readonly type: string
  properties: T
}

export class Ellipse implements Shape<EllipseProps> {
  type = "ellipse"
  properties = InitEllipseProps
}

export class Line implements Shape<LineProps> {
  type = "line"
  properties = InitLineProps
}

export class Rectangle implements Shape<RectangleProps> {
  type = "rectangle"
  properties = InitReactangleProps
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
