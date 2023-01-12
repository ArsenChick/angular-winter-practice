import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { APP_ROUTES } from './constants/routes'

const routes: Routes = [
  { path: '', redirectTo: `/${APP_ROUTES.home}`, pathMatch: 'full' },
  {
    path: APP_ROUTES.home,
    loadChildren: () =>
      import('./routes/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: APP_ROUTES.diagram,
    loadChildren: () =>
      import('./routes/diagram-editor/diagram-editor.module').then(
        (m) => m.DiagramEditorModule
      ),
  },
  { path: '**', redirectTo: `/${APP_ROUTES.home}`, pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
