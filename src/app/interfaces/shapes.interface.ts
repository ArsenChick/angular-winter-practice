export interface Ellipse {
  type: 'ellipse'
  properties: {
    x: number
    y: number
    rx: number
    ry: number
    fill: string
    strokeColor: string
    strokeWidth: number
  }
}

export interface Line {
  type: 'line'
  properties: {
    start: {
      x: number
      y: number
    }
    end: {
      x: number
      y: number
    }
    strokeColor: string
    strokeWidth: number
  }
}

export interface Rectangle {
  type: 'rectangle'
  properties: {
    x: number
    y: number
    height: number
    width: number
    fill: string
    strokeColor: string
    strokeWidth: number
  }
}
