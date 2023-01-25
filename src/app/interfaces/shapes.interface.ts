import { InitEllipseProps, InitLineProps, InitRectangleProps } from "../constants/shape-consts"

export interface IShape {
  readonly type: ShapeType
  properties?: IBaseProps
}

export enum ShapeType {
  Ellipse = "ellipse",
  Line = "line",
  Rectangle = "rectangle"
}

export class Ellipse implements IShape {
  type = ShapeType.Ellipse
  properties: IEllipseProps

  constructor(props: IEllipseProps = InitEllipseProps) {
    this.properties = props
  }
}

export class Line implements IShape {
  type = ShapeType.Line
  properties: ILineProps

  constructor(props: ILineProps = InitLineProps) {
    this.properties = props
  }
}

export class Rectangle implements IShape {
  type = ShapeType.Rectangle
  properties: IRectangleProps

  constructor(props: IRectangleProps = InitRectangleProps) {
    this.properties = props
  }
}

export class ShapeFactory {
  static create(type: ShapeType, props?: IBaseProps) {
    switch (type) {
      case ShapeType.Ellipse:
        return props ? new Ellipse(props as IEllipseProps) : new Ellipse()
      case ShapeType.Line:
        return props ? new Line(props as ILineProps) : new Line()
      case ShapeType.Rectangle:
        return props ? new Rectangle(props as IRectangleProps): new Rectangle()
      default:
        return null
    }
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
