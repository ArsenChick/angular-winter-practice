import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'

import { DiagramEditorRoutingModule } from './diagram-editor-routing.module'

import { DiagramEditorComponent } from './diagram-editor.component'
import { SvgDiagramComponent } from './components/svg-diagram/svg-diagram.component'
import { PropsSidebarComponent } from './components/props-sidebar/props-sidebar.component'
import { ShapesSidebarComponent } from './components/shapes-sidebar/shapes-sidebar.component'
import { RectangleComponent } from './components/svg-diagram/shapes/rectangle/rectangle.component'
import { EllipseComponent } from './components/svg-diagram/shapes/ellipse/ellipse.component'
import { LineComponent } from './components/svg-diagram/shapes/line/line.component'

import { DynamicShapeDirective } from './components/svg-diagram/dynamic-shape.directive'

@NgModule({
  declarations: [
    DiagramEditorComponent,
    SvgDiagramComponent,
    PropsSidebarComponent,
    ShapesSidebarComponent,
    RectangleComponent,
    EllipseComponent,
    DynamicShapeDirective,
    LineComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DiagramEditorRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class DiagramEditorModule {}
