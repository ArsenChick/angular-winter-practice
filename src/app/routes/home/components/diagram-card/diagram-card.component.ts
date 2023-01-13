import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-diagram-card',
  templateUrl: './diagram-card.component.html',
  styleUrls: ['./diagram-card.component.scss'],
})
export class DiagramCardComponent {
  @Input() title = 'No Title'
  @Input() id = 'undefined'
}
