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
import { Rectangle } from 'src/app/interfaces/shapes.interface'
import {
  NullRectangleProps,
  SelectedRectBaseProps,
} from 'src/app/constants/shape-consts'

@Component({
  selector: 'app-rectangle',
  templateUrl: './rectangle.component.html',
})
export class RectangleComponent
  implements IGeneralShapeComponent, OnInit, OnDestroy
{
  @ViewChild('template', { static: true })
  template!: TemplateRef<RectangleComponent>
  private subscription$?: Subscription

  id: number | null = null
  shape: Rectangle = new Rectangle(NullRectangleProps)
  selectRect: Rectangle = new Rectangle(NullRectangleProps)

  @Input()
  get data(): IIdShape {
    return { id: this.id, shape: this.shape }
  }
  set data({ id, shape }: IIdShape) {
    this.id = id
    this.shape = shape as Rectangle
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

  selectShape(event: MouseEvent): void {
    event.stopPropagation()
    if (this.isSelected) this.diagramStateService.selectShape(null)
    else this.diagramStateService.selectShape(this.data.id)
  }

  private getPath(): Rectangle {
    return new Rectangle({
      ...this.shape.properties,
      ...SelectedRectBaseProps,
    })
  }
}
