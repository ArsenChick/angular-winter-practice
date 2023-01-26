import { Component } from '@angular/core'

import { DiagramStateService } from '../../diagram-state.service'
import { ShapeType } from 'src/app/interfaces/shapes.interface'

@Component({
  selector: 'app-shapes-sidebar',
  templateUrl: './shapes-sidebar.component.html',
})
export class ShapesSidebarComponent {
  constructor(private diagramStateService: DiagramStateService) {}

  addEllipse(): void {
    this.diagramStateService.addShape(ShapeType.Ellipse)
  }

  addLine(): void {
    this.diagramStateService.addShape(ShapeType.Line)
  }

  addRectangle(): void {
    this.diagramStateService.addShape(ShapeType.Rectangle)
  }
}
