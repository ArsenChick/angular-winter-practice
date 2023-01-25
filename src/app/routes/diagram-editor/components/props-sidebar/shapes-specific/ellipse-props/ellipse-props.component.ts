import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormBuilder } from '@angular/forms'

import { IBaseProps, IEllipseProps } from 'src/app/interfaces/shapes.interface'
import { InitEllipseProps, NullBaseProps } from 'src/app/constants/shape-consts'

@Component({
  selector: 'app-ellipse-props',
  templateUrl: './ellipse-props.component.html',
  styleUrls: ['./ellipse-props.component.scss'],
})
export class EllipsePropsComponent {
  ellipseProps = this.fb.group({
    x: 0,
    y: 0,
    rx: 0,
    ry: 0,
  })

  @Input()
  set initialProps(ellipseProps: IBaseProps | null) {
    if (ellipseProps !== null) {
      const { x, y, rx, ry } = ellipseProps as IEllipseProps
      this.ellipseProps.setValue({ x, y, rx, ry })
    }
  }

  @Output() valuesChanged = new EventEmitter<IEllipseProps>()

  constructor(private fb: FormBuilder) {}

  sendValueToParent(): void {
    const { x, y, rx, ry } = this.ellipseProps.value
    this.valuesChanged.emit({
      x: x ?? 0,
      y: y ?? 0,
      rx: rx ?? InitEllipseProps.rx,
      ry: ry ?? InitEllipseProps.ry,
      ...NullBaseProps,
    })
  }
}
