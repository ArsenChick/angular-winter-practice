import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AppRoutes } from './constants/routes'

const routes: Routes = [
  { path: '', redirectTo: `/${AppRoutes.home}`, pathMatch: 'full' },
  {
    path: AppRoutes.home,
    loadChildren: () =>
      import('./routes/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: AppRoutes.diagram,
    loadChildren: () =>
      import('./routes/diagram-editor/diagram-editor.module').then(
        (m) => m.DiagramEditorModule
      ),
  },
  { path: '**', redirectTo: `/${AppRoutes.home}`, pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
