import { Component } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  title = new FormControl('Untitled')
}
