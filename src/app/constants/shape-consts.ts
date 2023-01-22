import { IDiagram } from '../interfaces/diagram.interface'
import {
  IBaseProps,
  IEllipseProps,
  ILineProps,
  IRectangleProps,
} from '../interfaces/shapes.interface'

const DefaultBaseProps: IBaseProps = {
  strokeColor: '#4a4a4a',
  strokeWidth: 2,
  fill: '#ff4747',
}

export const SelectedRectBaseProps = {
  strokeColor: '#0398fc',
  strokeWidth: 2,
  fill: '',
}

const NullBaseProps: IBaseProps = {
  strokeColor: '',
  strokeWidth: 0,
}

export const EmptyDiagram: IDiagram = {
  id: '',
  title: '',
  components: [],
}

export const InitEllipseProps: IEllipseProps = {
  x: 150,
  y: 150,
  rx: 100,
  ry: 100,
  ...DefaultBaseProps,
}

export const InitLineProps: ILineProps = {
  start: {
    x: 100,
    y: 100,
  },
  end: {
    x: 200,
    y: 200,
  },
  ...DefaultBaseProps,
}

export const InitRectangleProps: IRectangleProps = {
  x: 100,
  y: 100,
  height: 100,
  width: 100,
  ...DefaultBaseProps,
}

export const NullEllipseProps: IEllipseProps = {
  x: 0,
  y: 0,
  rx: 0,
  ry: 0,
  ...NullBaseProps,
}

export const NullLineProps: ILineProps = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 0,
    y: 0,
  },
  ...NullBaseProps,
}

export const NullRectangleProps: IRectangleProps = {
  x: 0,
  y: 0,
  height: 0,
  width: 0,
  ...NullBaseProps,
}
