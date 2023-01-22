import { Component } from '@angular/core'

import { DiagramStateService } from '../../diagram-state.service'
import { ShapeType } from 'src/app/interfaces/shapes.interface'

@Component({
  selector: 'app-shapes-sidebar',
  templateUrl: './shapes-sidebar.component.html',
  styleUrls: ['./shapes-sidebar.component.scss'],
})
export class ShapesSidebarComponent {
  constructor(private diagramStateService: DiagramStateService) {}

  addEllipse() {
    this.diagramStateService.addShape(ShapeType.Ellipse)
  }

  addLine() {
    this.diagramStateService.addShape(ShapeType.Line)
  }

  addRectangle() {
    this.diagramStateService.addShape(ShapeType.Rectangle)
  }
}
