import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

import { DiagramEditorRoutingModule } from './diagram-editor-routing.module'
import { DiagramEditorComponent } from './diagram-editor.component'
import { SvgDiagramComponent } from './components/svg-diagram/svg-diagram.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'

@NgModule({
  declarations: [DiagramEditorComponent, SvgDiagramComponent, SidebarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DiagramEditorRoutingModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class DiagramEditorModule {}
