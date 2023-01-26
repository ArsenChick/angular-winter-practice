import {
  DEFAULT_ELLIPSE_PROPS,
  DEFAULT_LINE_PROPS,
  DEFAULT_RECTANGLE_PROPS,
} from '../constants/shape-consts'

export interface IShape {
  readonly type: ShapeType
  properties?: IBaseProps
}

export enum ShapeType {
  Ellipse = 'ellipse',
  Line = 'line',
  Rectangle = 'rectangle',
}

export class Ellipse implements IShape {
  type = ShapeType.Ellipse
  properties: IEllipseProps

  constructor(props: IEllipseProps = DEFAULT_ELLIPSE_PROPS) {
    this.properties = props
  }
}

export class Line implements IShape {
  type = ShapeType.Line
  properties: ILineProps

  constructor(props: ILineProps = DEFAULT_LINE_PROPS) {
    this.properties = props
  }
}

export class Rectangle implements IShape {
  type = ShapeType.Rectangle
  properties: IRectangleProps

  constructor(props: IRectangleProps = DEFAULT_RECTANGLE_PROPS) {
    this.properties = props
  }
}

export interface IBaseProps {
  strokeColor: string
  strokeWidth: number
  fill?: string
}

export interface IEllipseProps extends IBaseProps {
  x: number
  y: number
  rx: number
  ry: number
}

export interface ILineProps extends IBaseProps {
  start: {
    x: number
    y: number
  }
  end: {
    x: number
    y: number
  }
}

export interface IRectangleProps extends IBaseProps {
  x: number
  y: number
  height: number
  width: number
}
