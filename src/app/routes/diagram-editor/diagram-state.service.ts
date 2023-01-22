import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

import {
  IDiagram,
  IDrawableDiagram,
} from 'src/app/interfaces/diagram.interface'
import { ShapeFactory, ShapeType } from 'src/app/interfaces/shapes.interface'

@Injectable({
  providedIn: 'root',
})
export class DiagramStateService {
  private diagram: IDrawableDiagram | null = null

  private _diagramState$: Subject<IDrawableDiagram | null> = new Subject()
  public get diagramState() {
    return this._diagramState$.asObservable()
  }

  private _selectedShapeId$: Subject<number | null> = new Subject()
  public get selectedShapeId() {
    return this._selectedShapeId$.asObservable()
  }

  initializeDiagramData({ id, title, components }: IDiagram) {
    const newComponents = components.map((shape, index) => {
      return { id: index, shape }
    })
    this.diagram = { id, title, components: newComponents }
    this.notifyAboutDiagramChange()
  }

  addShape(type: ShapeType) {
    if (this.diagram === null) return
    const shape = ShapeFactory.create(type)
    const id = this.diagram.components.length
    if (shape !== null) this.diagram.components.push({ id, shape })
    this.selectShape(id)
    this.notifyAboutDiagramChange()
  }

  getShape(id: number) {
    if (this.diagram === null) return null
    const idFound = this.diagram.components.find((shape) => shape.id === id)
    return idFound ?? null
  }

  selectShape(newSelectId: number | null = null) {
    this.notifyAboutSelectedChange(newSelectId ?? null)
  }

  private notifyAboutDiagramChange() {
    this._diagramState$.next(this.diagram)
  }

  private notifyAboutSelectedChange(id: number | null) {
    this._selectedShapeId$.next(id)
  }
}
