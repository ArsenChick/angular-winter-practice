import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormBuilder } from '@angular/forms'

import { IBaseProps, ILineProps } from 'src/app/interfaces/shapes.interface'
import { NULL_BASE_PROPS } from 'src/app/constants/shape-consts'

@Component({
  selector: 'app-line-props',
  templateUrl: './line-props.component.html',
  styleUrls: ['../shape-specific-props.scss'],
})
export class LinePropsComponent {
  @Input()
  set initialProps(ellipseProps: IBaseProps | null) {
    if (ellipseProps !== null) {
      const { start, end } = ellipseProps as ILineProps
      this.ellipseProps.setValue({
        x1: start.x,
        y1: start.y,
        x2: end.x,
        y2: end.y,
      })
    }
  }

  @Output() valuesChanged = new EventEmitter<ILineProps>()

  ellipseProps = this.fb.group({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  })

  constructor(private fb: FormBuilder) {}

  sendValueToParent(): void {
    const { x1, y1, x2, y2 } = this.ellipseProps.value
    this.valuesChanged.emit({
      start: { x: x1 ?? 0, y: y1 ?? 0 },
      end: { x: x2 ?? 0, y: y2 ?? 0 },
      ...NULL_BASE_PROPS,
    })
  }
}
