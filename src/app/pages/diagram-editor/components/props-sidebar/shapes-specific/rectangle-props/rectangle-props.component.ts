import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormBuilder } from '@angular/forms'

import {
  IBaseProps,
  IRectangleProps,
} from 'src/app/interfaces/shapes.interface'
import {
  DEFAULT_RECTANGLE_PROPS,
  NULL_BASE_PROPS,
} from 'src/app/constants/shape-consts'

@Component({
  selector: 'app-rectangle-props',
  templateUrl: './rectangle-props.component.html',
})
export class RectanglePropsComponent {
  @Input()
  set initialProps(ellipseProps: IBaseProps | null) {
    if (ellipseProps !== null) {
      const { x, y, width, height } = ellipseProps as IRectangleProps
      this.ellipseProps.setValue({ x, y, width, height })
    }
  }

  @Output() valuesChanged = new EventEmitter<IRectangleProps>()

  ellipseProps = this.fb.group({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  constructor(private fb: FormBuilder) {}

  sendValueToParent(): void {
    const { x, y, width, height } = this.ellipseProps.value
    this.valuesChanged.emit({
      x: x ?? 0,
      y: y ?? 0,
      width: width ?? DEFAULT_RECTANGLE_PROPS.width,
      height: height ?? DEFAULT_RECTANGLE_PROPS.height,
      ...NULL_BASE_PROPS,
    })
  }
}
