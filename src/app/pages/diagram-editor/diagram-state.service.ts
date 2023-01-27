import { Injectable } from '@angular/core'
import { cloneDeep } from 'lodash'
import { Subject } from 'rxjs'
import { v1 as uuidv1 } from 'uuid'

import { DEFAULT_BASE_PROPS } from 'src/app/constants/shape-consts'

import {
  IDiagram,
  IDrawableDiagram,
  IIdShape,
} from 'src/app/interfaces/diagram.interface'
import { ShapeFactory } from 'src/app/interfaces/shape-factory.class'
import {
  IBaseProps,
  ShapeType,
} from 'src/app/interfaces/shapes.interface'

@Injectable({
  providedIn: 'root',
})
export class DiagramStateService {
  private _diagramStateSubject$: Subject<IDrawableDiagram | null> =
    new Subject()
  get diagramState$() {
    return this._diagramStateSubject$.asObservable()
  }
  private _selectedShapeIdSubject$: Subject<string | null> = new Subject()
  get selectedShapeId$() {
    return this._selectedShapeIdSubject$.asObservable()
  }

  private shapeFactory = new ShapeFactory()
  private diagram: IDrawableDiagram | null = null

  initializeDiagramData({ id, title, components }: IDiagram): void {
    const newComponents = components.map((shape) => ({
      id: uuidv1(),
      shape,
    }))
    this.diagram = { id, title, components: newComponents }
    this.notifyAboutDiagramChange()
  }

  addShape(type: ShapeType): void {
    if (this.diagram === null) return
    const shape = this.shapeFactory.create(type)
    const id = uuidv1()
    if (shape !== null) this.diagram.components.push({ id, shape })
    this.selectShape(id)
    this.notifyAboutDiagramChange()
  }

  updateShape(id: string, props?: IBaseProps): void {
    if (this.diagram === null) return
    this.diagram.components = this.diagram.components.map((component) => {
      if (component.id !== id) return component
      else {
        const properties = props ?? DEFAULT_BASE_PROPS
        const shape = {
          type: component.shape.type,
          properties: cloneDeep(properties),
        }
        return { id, shape }
      }
    })
    this.notifyAboutDiagramChange()
  }

  getShape(id: string | null): IIdShape | null {
    if (this.diagram === null || id === null) return null
    const idFound = this.diagram.components.find((shape) => shape.id === id)
    return idFound ?? null
  }

  selectShape(newSelectId: string | null = null): void {
    this.notifyAboutSelectedChange(newSelectId ?? null)
  }

  private notifyAboutDiagramChange(): void {
    this._diagramStateSubject$.next(cloneDeep(this.diagram))
  }

  private notifyAboutSelectedChange(id: string | null): void {
    this._selectedShapeIdSubject$.next(id)
  }
}
