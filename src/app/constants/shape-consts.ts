import { EllipseProps, LineProps, RectangleProps } from "../interfaces/shapes.interface";

export const InitEllipseProps: EllipseProps = {
  x: 0,
  y: 0,
  rx: 0,
  ry: 0,
  strokeColor: "",
  strokeWidth: 0
}

export const InitLineProps: LineProps = {
  start: {
    x: 0,
    y: 0
  },
  end: {
    x: 0,
    y: 0
  },
  strokeColor: "",
  strokeWidth: 0
}

export const InitRectangleProps: RectangleProps = {
  x: 0,
  y: 0,
  height: 0,
  width: 0,
  strokeColor: "",
  strokeWidth: 0
}
