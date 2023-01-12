import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DiagramEditorRoutingModule } from './diagram-editor-routing.module'
import { DiagramEditorComponent } from './diagram-editor.component'

@NgModule({
  declarations: [DiagramEditorComponent],
  imports: [CommonModule, DiagramEditorRoutingModule],
})
export class DiagramEditorModule {}
