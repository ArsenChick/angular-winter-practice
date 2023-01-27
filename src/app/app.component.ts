import { Component } from '@angular/core'
import { APP_ROUTES } from './constants/urls'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  homeRouterLink = `/${APP_ROUTES.home}`
}
