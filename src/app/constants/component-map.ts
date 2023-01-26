import { Type } from '@angular/core'

import { ShapeType } from '../interfaces/shapes.interface'
import { IGeneralShapeComponent } from '../pages/diagram-editor/components/svg-diagram/shapes/general-shape.component'

import { EllipseComponent } from '../pages/diagram-editor/components/svg-diagram/shapes/ellipse/ellipse.component'
import { RectangleComponent } from '../pages/diagram-editor/components/svg-diagram/shapes/rectangle/rectangle.component'
import { LineComponent } from '../pages/diagram-editor/components/svg-diagram/shapes/line/line.component'

export const SHAPE_COMPONENT_TYPE_MAP = new Map<
  ShapeType,
  Type<IGeneralShapeComponent>
>([
  [ShapeType.Ellipse, EllipseComponent],
  [ShapeType.Rectangle, RectangleComponent],
  [ShapeType.Line, LineComponent]
])
