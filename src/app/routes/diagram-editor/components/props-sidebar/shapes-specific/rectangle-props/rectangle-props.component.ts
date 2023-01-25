import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormBuilder } from '@angular/forms'

import {
  IBaseProps,
  IRectangleProps,
} from 'src/app/interfaces/shapes.interface'
import {
  InitRectangleProps,
  NullBaseProps,
} from 'src/app/constants/shape-consts'

@Component({
  selector: 'app-rectangle-props',
  templateUrl: './rectangle-props.component.html',
  styleUrls: ['./rectangle-props.component.scss'],
})
export class RectanglePropsComponent {
  ellipseProps = this.fb.group({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  @Input()
  set initialProps(ellipseProps: IBaseProps | null) {
    if (ellipseProps !== null) {
      const { x, y, width, height } = ellipseProps as IRectangleProps
      this.ellipseProps.setValue({
        x,
        y,
        width,
        height,
      })
    }
  }

  @Output() valuesChanged = new EventEmitter<IRectangleProps>()

  constructor(private fb: FormBuilder) {}

  sendValueToParent(): void {
    const { x, y, width, height } = this.ellipseProps.value
    this.valuesChanged.emit({
      x: x ?? 0,
      y: y ?? 0,
      width: width ?? InitRectangleProps.width,
      height: height ?? InitRectangleProps.height,
      ...NullBaseProps,
    })
  }
}
