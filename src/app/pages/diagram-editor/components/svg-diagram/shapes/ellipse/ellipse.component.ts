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
import { DiagramStateService } from 'src/app/pages/diagram-editor/diagram-state.service'

import { IIdShape } from 'src/app/interfaces/diagram.interface'
import { Ellipse, Rectangle } from 'src/app/interfaces/shapes.interface'
import {
  NULL_ELLIPSE_PROPS,
  NULL_RECTANGLE_PROPS,
  SELECT_RECT_BASE_PROPS,
} from 'src/app/constants/shape-consts'

@Component({
  selector: 'app-ellipse',
  templateUrl: './ellipse.component.html',
})
export class EllipseComponent
  implements IGeneralShapeComponent, OnInit, OnDestroy
{
  @Input()
  get data(): IIdShape {
    return { id: this.id, shape: this.shape }
  }
  set data({ id, shape }: IIdShape) {
    this.id = id
    this.shape = shape as Ellipse
    this.selectRect = this.getSelectPath()
  }
  @Input() isSelected = false

  @ViewChild('template', { static: true })
  template!: TemplateRef<EllipseComponent>
  private subscription$?: Subscription

  id: string | null = null
  shape: Ellipse = new Ellipse(NULL_ELLIPSE_PROPS)
  selectRect: Rectangle = new Rectangle(NULL_RECTANGLE_PROPS)

  constructor(
    private vcr: ViewContainerRef,
    private diagramStateService: DiagramStateService
  ) {}

  ngOnInit(): void {
    this.vcr.createEmbeddedView(this.template)
    this.subscription$ = this.diagramStateService.selectedShapeId$.subscribe(
      (id) => {
        if (id !== null) this.isSelected = id === this.data.id
        else this.isSelected = false
      }
    )
  }

  selectShape(event: MouseEvent): void {
    event.stopPropagation()
    if (this.isSelected) this.diagramStateService.selectShape(null)
    else this.diagramStateService.selectShape(this.data.id)
  }

  private getSelectPath(): Rectangle {
    const { x, y, rx, ry } = this.shape.properties
    return new Rectangle({
      x: x - rx,
      y: y - ry,
      width: 2 * rx,
      height: 2 * ry,
      ...SELECT_RECT_BASE_PROPS,
    })
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe()
  }
}
