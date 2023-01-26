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
import { Rectangle } from 'src/app/interfaces/shapes.interface'
import {
  NULL_RECTANGLE_PROPS,
  SELECT_RECT_BASE_PROPS,
} from 'src/app/constants/shape-consts'

@Component({
  selector: 'app-rectangle',
  templateUrl: './rectangle.component.html',
})
export class RectangleComponent
  implements IGeneralShapeComponent, OnInit, OnDestroy
{
  @Input()
  get data(): IIdShape {
    return { id: this.id, shape: this.shape }
  }
  set data({ id, shape }: IIdShape) {
    this.id = id
    this.shape = shape as Rectangle
    this.selectRect = this.getSelectPath()
  }
  @Input() isSelected = false

  @ViewChild('template', { static: true })
  template!: TemplateRef<RectangleComponent>
  private subscription$?: Subscription

  id: number | null = null
  shape: Rectangle = new Rectangle(NULL_RECTANGLE_PROPS)
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
    return new Rectangle({
      ...this.shape.properties,
      ...SELECT_RECT_BASE_PROPS,
    })
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe()
  }
}
