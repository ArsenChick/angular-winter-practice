import { Component, ComponentRef, Input, ViewChild } from '@angular/core'

import { DiagramStateService } from '../../diagram-state.service'
import { DynamicShapeDirective } from './dynamic-shape.directive'
import { IGeneralShapeComponent } from './shapes/general-shape.component'

import { IIdShape } from 'src/app/interfaces/diagram.interface'
import { SHAPE_COMPONENT_TYPE_MAP } from 'src/app/constants/component-map'

@Component({
  selector: 'app-svg-diagram',
  templateUrl: './svg-diagram.component.html',
  styleUrls: ['./svg-diagram.component.scss'],
})
export class SvgDiagramComponent {
  @Input() selectedShapeId: number | null = null
  @Input()
  get shapes(): IIdShape[] {
    return this._shapes
  }
  set shapes(newShapes: IIdShape[] | null) {
    this._shapes = newShapes ?? []
    this.drawDiagram()
  }

  @ViewChild(DynamicShapeDirective, { static: true })
  shapeHost!: DynamicShapeDirective

  private componentRefs: ComponentRef<IGeneralShapeComponent>[] = []
  private _shapes: IIdShape[] = []

  constructor(private diagramStateService: DiagramStateService) {}

  unselectShapes(): void {
    this.diagramStateService.selectShape(null)
  }

  private drawDiagram(): void {
    const vcr = this.shapeHost.viewContainerRef
    vcr.clear()
    this.destroyShapes()

    this._shapes.forEach((shapeObj) => {
      const componentType = SHAPE_COMPONENT_TYPE_MAP.get(shapeObj.shape.type)
      if (componentType !== undefined) {
        const cr = vcr.createComponent<IGeneralShapeComponent>(componentType)
        cr.instance.data = shapeObj
        cr.instance.isSelected = shapeObj.id === this.selectedShapeId
        this.componentRefs.push(cr)
      }
    })
  }

  private destroyShapes(): void {
    this.componentRefs.forEach((cr) => cr.destroy())
    this.componentRefs = []
  }
}
