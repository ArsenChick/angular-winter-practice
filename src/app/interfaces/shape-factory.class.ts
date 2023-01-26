import {
  ShapeType,
  IBaseProps,
  Ellipse,
  IEllipseProps,
  Line,
  ILineProps,
  Rectangle,
  IRectangleProps,
} from './shapes.interface'

const SHAPE_TYPE_MAP = {
  [ShapeType.Ellipse]: new Ellipse(),
  [ShapeType.Line]: new Line(),
  [ShapeType.Rectangle]: new Rectangle(),
}

type ST = typeof SHAPE_TYPE_MAP

export class ShapeFactory {
  create(type: ShapeType): ST[ShapeType] {
    return SHAPE_TYPE_MAP[type]
  }
}
