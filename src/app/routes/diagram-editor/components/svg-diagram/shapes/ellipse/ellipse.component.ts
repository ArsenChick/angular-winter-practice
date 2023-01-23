import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import { Subscription } from 'rxjs'

import { IGeneralShapeComponent } from '../general-shape.component'
import { DiagramStateService } from 'src/app/routes/diagram-editor/diagram-state.service'

import { IIdShape } from 'src/app/interfaces/diagram.interface'
import { Ellipse, Rectangle } from 'src/app/interfaces/shapes.interface'
import {
  NullEllipseProps,
  NullRectangleProps,
  SelectedRectBaseProps,
} from 'src/app/constants/shape-consts'

@Component({
  selector: 'app-ellipse',
  templateUrl: './ellipse.component.html',
})
export class EllipseComponent
  implements IGeneralShapeComponent, OnInit, OnDestroy
{
  @ViewChild('template', { static: true })
  template!: TemplateRef<EllipseComponent>
  private subscription$?: Subscription

  id: number | null = null
  shape: Ellipse = new Ellipse(NullEllipseProps)
  selectRect: Rectangle = new Rectangle(NullRectangleProps)

  @Input()
  get data(): IIdShape {
    return { id: this.id, shape: this.shape }
  }
  set data({ id, shape }: IIdShape) {
    this.id = id
    this.shape = shape as Ellipse
    this.selectRect = this.getPath()
  }
  @Input() isSelected = false

  constructor(
    private vcr: ViewContainerRef,
    private diagramStateService: DiagramStateService
  ) {}

  ngOnInit(): void {
    this.vcr.createEmbeddedView(this.template)
    this.subscription$ = this.diagramStateService.selectedShapeId.subscribe(
      (id) => {
        if (id !== null) this.isSelected = id === this.data.id
        else this.isSelected = false
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe()
  }

  selectShape(): void {
    if (this.isSelected) this.diagramStateService.selectShape(null)
    else this.diagramStateService.selectShape(this.data.id)
  }

  private getPath(): Rectangle {
    const { x, y, rx, ry } = this.shape.properties
    return new Rectangle({
      x: x - rx,
      y: y - ry,
      width: 2 * rx,
      height: 2 * ry,
      ...SelectedRectBaseProps,
    })
  }
}
