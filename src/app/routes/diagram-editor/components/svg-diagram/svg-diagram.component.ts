import { Component, ComponentRef, Input, ViewChild } from '@angular/core'

import { DynamicShapeDirective } from './dynamic-shape.directive'
import { IGeneralShapeComponent } from './shapes/general-shape.component'

import { ShapeComponentTypeMap } from 'src/app/constants/component-map'
import { IIdShape } from 'src/app/interfaces/diagram.interface'

@Component({
  selector: 'app-svg-diagram',
  templateUrl: './svg-diagram.component.html',
  styleUrls: ['./svg-diagram.component.scss'],
})
export class SvgDiagramComponent {
  @ViewChild(DynamicShapeDirective, { static: true })
  shapeHost!: DynamicShapeDirective
  private componentRefs: ComponentRef<IGeneralShapeComponent>[] = []

  @Input() selectedShapeId: number | null = null
  private _shapes: IIdShape[] = []
  @Input()
  get shapes(): IIdShape[] {
    return this._shapes
  }
  set shapes(newShapes: IIdShape[] | null) {
    this._shapes = newShapes ?? []
    this.drawDiagram()
  }

  private drawDiagram(): void {
    const vcr = this.shapeHost.viewContainerRef
    vcr.clear()
    this.destroyShapes()

    this._shapes.map((shapeObj) => {
      const componentType = ShapeComponentTypeMap.get(shapeObj.shape.type)
      if (componentType !== undefined) {
        const cr = vcr.createComponent<IGeneralShapeComponent>(componentType)
        cr.instance.data = shapeObj
        cr.instance.isSelected = shapeObj.id === this.selectedShapeId
        this.componentRefs.push(cr)
      }
    })
  }

  private destroyShapes(): void {
    this.componentRefs.map((cr) => cr.destroy())
    this.componentRefs = []
  }
}
