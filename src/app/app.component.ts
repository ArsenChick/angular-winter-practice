import { Component } from '@angular/core'
import { AppRoutes } from './constants/routes'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public homeRouterLink = `/${AppRoutes.home}`
}
