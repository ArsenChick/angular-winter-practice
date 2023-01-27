import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { NgxColorsModule } from 'ngx-colors'

import { DiagramEditorRoutingModule } from './diagram-editor-routing.module'

import { DiagramEditorComponent } from './diagram-editor.component'
import { SvgDiagramComponent } from './components/svg-diagram/svg-diagram.component'
import { PropsSidebarComponent } from './components/props-sidebar/props-sidebar.component'
import { ShapesSidebarComponent } from './components/shapes-sidebar/shapes-sidebar.component'
import { RectangleComponent } from './components/svg-diagram/shapes/rectangle/rectangle.component'
import { EllipseComponent } from './components/svg-diagram/shapes/ellipse/ellipse.component'
import { LineComponent } from './components/svg-diagram/shapes/line/line.component'

import { DynamicShapeDirective } from './components/svg-diagram/dynamic-shape.directive'
import { EllipsePropsComponent } from './components/props-sidebar/shapes-specific/ellipse-props/ellipse-props.component'
import { LinePropsComponent } from './components/props-sidebar/shapes-specific/line-props/line-props.component'
import { RectanglePropsComponent } from './components/props-sidebar/shapes-specific/rectangle-props/rectangle-props.component'

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
    EllipsePropsComponent,
    LinePropsComponent,
    RectanglePropsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DiagramEditorRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgxColorsModule,
  ],
})
export class DiagramEditorModule {}
