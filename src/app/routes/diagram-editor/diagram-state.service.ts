import { Injectable } from '@angular/core'
import { cloneDeep } from 'lodash'
import { Subject } from 'rxjs'
import { DefaultBaseProps } from 'src/app/constants/shape-consts'

import {
  IDiagram,
  IDrawableDiagram,
  IIdShape,
} from 'src/app/interfaces/diagram.interface'
import {
  IBaseProps,
  ShapeFactory,
  ShapeType,
} from 'src/app/interfaces/shapes.interface'

@Injectable({
  providedIn: 'root',
})
export class DiagramStateService {
  private diagram: IDrawableDiagram | null = null

  private _diagramState$: Subject<IDrawableDiagram | null> = new Subject()
  get diagramState() {
    return this._diagramState$.asObservable()
  }
  private _selectedShapeId$: Subject<number | null> = new Subject()
  get selectedShapeId() {
    return this._selectedShapeId$.asObservable()
  }

  initializeDiagramData({ id, title, components }: IDiagram): void {
    const newComponents = components.map((shape, index) => ({
      id: index,
      shape,
    }))
    this.diagram = { id, title, components: newComponents }
    this.notifyAboutDiagramChange()
  }

  addShape(type: ShapeType): void {
    if (this.diagram === null) return
    const shape = ShapeFactory.create(type)
    const id = this.diagram.components.length
    if (shape !== null) this.diagram.components.push({ id, shape })
    this.selectShape(id)
    this.notifyAboutDiagramChange()
  }

  updateShape(id: number, props?: IBaseProps): void {
    if (this.diagram === null) return
    this.diagram.components = this.diagram.components.map((component) => {
      if (component.id !== id) return component
      else {
        const properties = props ?? DefaultBaseProps
        const shape = {
          type: component.shape.type,
          properties: cloneDeep(properties),
        }
        return { id, shape }
      }
    })
    this.notifyAboutDiagramChange()
  }

  getShape(id: number | null): IIdShape | null {
    if (this.diagram === null || id === null) return null
    const idFound = this.diagram.components.find((shape) => shape.id === id)
    return idFound ?? null
  }

  selectShape(newSelectId: number | null = null): void {
    this.notifyAboutSelectedChange(newSelectId ?? null)
  }

  private notifyAboutDiagramChange(): void {
    this._diagramState$.next(cloneDeep(this.diagram))
  }

  private notifyAboutSelectedChange(id: number | null): void {
    this._selectedShapeId$.next(id)
  }
}
