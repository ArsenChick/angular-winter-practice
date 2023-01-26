import { IDiagram } from '../interfaces/diagram.interface'
import {
  IBaseProps,
  IEllipseProps,
  ILineProps,
  IRectangleProps,
} from '../interfaces/shapes.interface'

export const DEFAULT_BASE_PROPS: IBaseProps = {
  strokeColor: '#4a4a4a',
  strokeWidth: 2,
  fill: '#ff4747',
}

export const SELECT_RECT_BASE_PROPS = {
  strokeColor: '#36e1ff',
  strokeWidth: 4,
  fill: '',
}

export const NULL_BASE_PROPS: IBaseProps = {
  strokeColor: '',
  strokeWidth: 0,
}

export const EMPTY_DIAGRAM: IDiagram = {
  id: '',
  title: '',
  components: [],
}

export const DEFAULT_ELLIPSE_PROPS: IEllipseProps = {
  x: 150,
  y: 150,
  rx: 100,
  ry: 100,
  ...DEFAULT_BASE_PROPS,
}

export const DEFAULT_LINE_PROPS: ILineProps = {
  start: {
    x: 100,
    y: 100,
  },
  end: {
    x: 200,
    y: 200,
  },
  ...DEFAULT_BASE_PROPS,
}

export const DEFAULT_RECTANGLE_PROPS: IRectangleProps = {
  x: 100,
  y: 100,
  height: 100,
  width: 100,
  ...DEFAULT_BASE_PROPS,
}

export const NULL_ELLIPSE_PROPS: IEllipseProps = {
  x: 0,
  y: 0,
  rx: 0,
  ry: 0,
  ...NULL_BASE_PROPS,
}

export const NULL_LINE_PROPS: ILineProps = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 0,
    y: 0,
  },
  ...NULL_BASE_PROPS,
}

export const NULL_RECTANGLE_PROPS: IRectangleProps = {
  x: 0,
  y: 0,
  height: 0,
  width: 0,
  ...NULL_BASE_PROPS,
}
