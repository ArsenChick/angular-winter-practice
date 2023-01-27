import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-diagram-card',
  templateUrl: './diagram-card.component.html',
  styleUrls: ['./diagram-card.component.scss'],
})
export class DiagramCardComponent {
  @Input() title = ''
  @Input() id = ''

  @Output() navigateEvent = new EventEmitter<string>()

  navigateToDiagram() {
    this.navigateEvent.emit(this.id)
  }
}
