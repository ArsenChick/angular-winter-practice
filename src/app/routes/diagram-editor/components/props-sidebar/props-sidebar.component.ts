import { Component } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-props-sidebar',
  templateUrl: './props-sidebar.component.html',
  styleUrls: ['./props-sidebar.component.scss'],
})
export class PropsSidebarComponent {
  title = new FormControl('Untitled')
}
