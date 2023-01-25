import { Component, Input } from '@angular/core'
import { FormBuilder, FormControl } from '@angular/forms'

import { DiagramStateService } from '../../diagram-state.service'

import { IBaseProps, ShapeType } from 'src/app/interfaces/shapes.interface'
import { NullBaseProps } from 'src/app/constants/shape-consts'

@Component({
  selector: 'app-props-sidebar',
  templateUrl: './props-sidebar.component.html',
  styleUrls: ['./props-sidebar.component.scss'],
})
export class PropsSidebarComponent {
  ShapeTypes = ShapeType

  title = new FormControl('Untitled')
  baseProps = this.fb.group({
    strokeWidth: 0,
    strokeColor: '',
    fill: '',
  })

  selectedInitialProps: IBaseProps | null = null
  selectedType: ShapeType | null = null
  private _selectedId: number | null = null
  private _selectedShapeProps: IBaseProps | null = null

  @Input()
  get selectedShapeId(): number | null {
    return this._selectedId
  }
  set selectedShapeId(newId: number | null) {
    this._selectedId = newId
    if (newId !== null) {
      const component = this.diagramStateService.getShape(newId)
      if (component && component.shape.properties) {
        this.selectedType = component.shape.type
        this.selectedInitialProps = component.shape.properties
        this._selectedShapeProps = component.shape.properties
        const { strokeWidth, strokeColor, fill } = component.shape.properties

        this.baseProps.setValue({
          strokeWidth,
          strokeColor,
          fill: fill ?? null,
        })
      }
    } else this.selectedType = null
  }

  constructor(
    private fb: FormBuilder,
    private diagramStateService: DiagramStateService
  ) {}

  changeShapeSpecificProps(newProps: IBaseProps): void {
    this._selectedShapeProps = newProps
    this.updateShape()
  }

  updateShape(): void {
    if (this._selectedId !== null && this._selectedShapeProps !== null) {
      const { strokeWidth, strokeColor, fill } = this.baseProps.value
      const newProps = {
        ...this._selectedShapeProps,
        strokeWidth: strokeWidth ?? NullBaseProps.strokeWidth,
        strokeColor: strokeColor ?? NullBaseProps.strokeColor,
        fill: fill ?? NullBaseProps.fill,
      }
      this.diagramStateService.updateShape(this._selectedId, newProps)
    }
  }
}
